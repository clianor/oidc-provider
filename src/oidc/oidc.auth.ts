import { Account } from 'oidc-provider';

const db = {
  users: [
    {
      id: '23121d3c-84df-44ac-b458-3d63a9a05497',
      email: 'foo@example.com',
      email_verified: true,
      password: 'foo',
    },
    {
      id: 'c2ac2b4a-2262-4e2f-847a-a40dd3c4dcd5',
      email: 'bar@example.com',
      email_verified: false,
      password: 'bar',
    },
  ],
};

class OidcAuth {
  static async findAccount(ctx, id): Promise<Account | undefined> {
    const account = db['users'].find((user) => user.email === id);
    if (!account) {
      return undefined;
    }

    return {
      accountId: id,
      async claims(use, scope) {
        console.log('claims: ', use, '|', scope);
        return {
          sub: id,
          email: account.email,
          email_verified: account.email_verified,
        };
      },
    };
  }

  static async authenticate(email, password) {
    console.log('authenticate: ', email, password);
    try {
      const lowercased = String(email).toLowerCase();
      const account = db['users'].find((user) => user.email === lowercased);
      if (account.password !== password) {
        return undefined;
      }
      return account.id;
    } catch (err) {
      return undefined;
    }
  }
}

export default OidcAuth;
