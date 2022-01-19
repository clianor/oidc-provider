import Redis from 'ioredis';
import { isEmpty } from 'lodash';

const grantable = new Set([
  'AccessToken',
  'AuthorizationCode',
  'RefreshToken',
  'DeviceCode',
  'BackchannelAuthenticationRequest',
]);

const consumable = new Set([
  'AuthorizationCode',
  'RefreshToken',
  'DeviceCode',
  'BackchannelAuthenticationRequest',
]);

function grantKeyFor(id) {
  return `grant:${id}`;
}

function userCodeKeyFor(userCode) {
  return `userCode:${userCode}`;
}

function uidKeyFor(uid) {
  return `uid:${uid}`;
}

const client = new Redis(process.env.REDIS_URL, { keyPrefix: 'oidc:' });

class RedisAdapter {
  public name: string;

  constructor(name) {
    this.name = name;
  }

  async upsert(id, payload, expiresIn) {
    const key = this.key(id);
    const isConsumable = consumable.has(this.name);
    const store = isConsumable ? { payload: JSON.stringify(payload) } : JSON.stringify(payload);

    const multi = client.multi();
    if (isConsumable) {
      multi['hmset'](key, store as any);
    } else {
      multi['set'](key, store as any);
    }

    if (expiresIn) {
      multi.expire(key, expiresIn);
    }

    if (grantable.has(this.name) && payload.grantId) {
      const grantKey = grantKeyFor(payload.grantId);
      multi.rpush(grantKey, key);
      // if you're seeing grant key lists growing out of acceptable proportions consider using LTRIM
      // here to trim the list to an appropriate length
      const ttl = await client.ttl(grantKey);
      if (expiresIn > ttl) {
        multi.expire(grantKey, expiresIn);
      }
    }

    if (payload.userCode) {
      const userCodeKey = userCodeKeyFor(payload.userCode);
      multi.set(userCodeKey, id);
      multi.expire(userCodeKey, expiresIn);
    }

    if (payload.uid) {
      const uidKey = uidKeyFor(payload.uid);
      multi.set(uidKey, id);
      multi.expire(uidKey, expiresIn);
    }

    await multi.exec();
  }

  async find(id) {
    const data = consumable.has(this.name)
      ? await client.hgetall(this.key(id))
      : await client.get(this.key(id));

    if (isEmpty(data)) {
      return undefined;
    }

    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    const { payload, ...rest } = data;
    return {
      ...rest,
      ...JSON.parse(payload),
    };
  }

  async findByUid(uid) {
    const id = await client.get(uidKeyFor(uid));
    return this.find(id);
  }

  async findByUserCode(userCode) {
    const id = await client.get(userCodeKeyFor(userCode));
    return this.find(id);
  }

  async destroy(id) {
    const key = this.key(id);
    await client.del(key);
  }

  async revokeByGrantId(grantId) {
    const multi = client.multi();
    const tokens = await client.lrange(grantKeyFor(grantId), 0, -1);
    tokens.forEach((token) => multi.del(token));
    multi.del(grantKeyFor(grantId));
    await multi.exec();
  }

  async consume(id) {
    await client.hset(this.key(id), 'consumed', Math.floor(Date.now() / 1000));
  }

  key(id) {
    return `${this.name}:${id}`;
  }
}

// class RedisAdapter {
//   private readonly name: string;
//
//   constructor(name) {
//     this.name = name;
//   }
//
//   key(id) {
//     return `${this.name}:${id}`;
//   }
//
//   async upsert(id: string, payload: AdapterPayload, expiresIn: number): Promise<undefined | void> {
//     const key = this.key(id);
//     const store = consumable.has(this.name)
//       ? JSON.stringify({ payload: JSON.stringify(payload) })
//       : JSON.stringify(payload);
//
//     const multi = client.multi();
//     if (consumable.has(this.name)) {
//       multi['hmset'](key, store);
//     } else {
//       multi['set'](key, store);
//     }
//
//     if (expiresIn) {
//       multi.expire(key, expiresIn);
//     }
//
//     if (grantable.has(this.name) && payload.grantId) {
//       const grantKey = grantKeyFor(payload.grantId);
//       multi.rpush(grantKey, key);
//       const ttl = await client.ttl(grantKey);
//       if (expiresIn > ttl) {
//         multi.expire(grantKey, expiresIn);
//       }
//     }
//
//     if (payload.userCode) {
//       const userCodeKey = userCodeKeyFor(payload.userCode);
//       multi.set(userCodeKey, id);
//       multi.expire(userCodeKey, expiresIn);
//     }
//
//     if (payload.uid) {
//       const uidKey = uidKeyFor(payload.uid);
//       multi.set(uidKey, id);
//       multi.expire(uidKey, expiresIn);
//     }
//
//     await multi.exec();
//   }
//
//   async find(id: string): Promise<AdapterPayload | undefined | void> {
//     const data = consumable.has(this.name)
//       ? await client.hgetall(this.key(id)) // 세션이 아닐때
//       : await client.get(this.key(id)); // 세션일때
//
//     if (isEmpty(data)) {
//       return undefined;
//     }
//
//     if (typeof data === 'string') {
//       return JSON.parse(data);
//     }
//     const { payload, ...rest } = data;
//     return {
//       ...rest,
//       ...JSON.parse(payload),
//     };
//   }
//
//   async findByUserCode(userCode: string): Promise<AdapterPayload | undefined | void> {
//     const id = await client.get(userCodeKeyFor(userCode));
//     return this.find(id);
//   }
//
//   async findByUid(uid: string): Promise<AdapterPayload | undefined | void> {
//     const id = await client.get(uidKeyFor(uid));
//     return this.find(id);
//   }
//
//   async consume(id: string): Promise<undefined | void> {
//     await client.hset(this.key(id), 'consumed', Math.floor(Date.now() / 1000));
//   }
//
//   async destroy(id: string): Promise<undefined | void> {
//     const key = this.key(id);
//     await client.del(key);
//   }
//
//   async revokeByGrantId(grantId: string): Promise<undefined | void> {
//     const multi = client.multi();
//     const tokens = await client.lrange(grantKeyFor(grantId), 0, -1);
//     tokens.forEach((token) => multi.del(token));
//     multi.del(grantKeyFor(grantId));
//     await multi.exec();
//   }
// }

export default RedisAdapter;
