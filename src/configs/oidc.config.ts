import { Configuration } from 'oidc-provider';
import OidcAuth from '../oidc/oidc.auth';
import RedisAdapter from '../oidc/redis.adapter';

/**
 * OAuth 2.0 클라이언트 인증 방법 ( https://ichi.pro/ko/oauth-2-0-keullaieonteu-injeung-82873853085140 )
 * client_secret_basic: 토큰 요청에 클라이언트 ID와 클라이언트 암호를 포함하는 또 다른 방법은 기본 인증 ( RFC 7617 )을 사용하는 것
 * client_secret_jwt: 토큰 요청에 클라이언트 암호를 직접 포함하지 않고 클라이언트 응용 프로그램에 클라이언트 암호가 있음을 간접적으로 증명하는 방법
 * client_secret_post: 전통적인 방식으로 시작하려면 권한 부여 서버가 클라이언트 ID 와 클라이언트 시크릿 쌍을 생성 하고이 쌍을 미리 클라이언트 애플리케이션에 제공
 */

const oidcConfig: Configuration = {
  adapter: RedisAdapter,
  clients: [
    // authorization code
    {
      client_id: 'test',
      client_secret: 'test',
      application_type: 'web',
      response_types: ['code'],
      grant_types: ['refresh_token', 'authorization_code'],
      redirect_uris: ['http://localhost:3000', 'https://jwt.io'],
      id_token_signed_response_alg: 'ES256',
      scope: 'openid email offline_access',
    },
  ],
  scopes: ['openid', 'email', 'offline_access'],
  cookies: {
    keys: ['some secret key', 'old key', 'and one more'],
  },
  jwks: {
    keys: [
      {
        crv: 'P-256',
        x: 'DwJPG5xGA83WbPwsV2OPSSr3jG1Mw58wFYv_q71j9T4',
        y: 'wMQy-pFHHP9nOhs7A1zVKqiHZrp66FcdZehKE0yY7f4',
        d: 'HNFaqHh_PFaBPuwW9sBlbO4G1ZEV5Rom8fsBu1Ti3Cw',
        kty: 'EC',
        kid: '9h6WThGBzYfIfkBZT02YTkqNn5cWWTXTrWRZDLeI22M',
        alg: 'ES256',
        use: 'sig',
      },
      {
        crv: 'Ed25519',
        x: 'R-tv5n3IFPeZnS9Ce5t0pI98SLAB9Fa3WrLg15XGBoI',
        d: 'AHhXbC5E1J_G-Td3Ss5hJiFm0ZUVmq4O--G9SIELG3A',
        kty: 'OKP',
        kid: 'g2DLWjKprGFwJuYOkpADHC0jc6Zjc1FiqEq97X7R0lk',
        alg: 'EdDSA',
        use: 'sig',
      },
      {
        e: 'AQAB',
        n: 'qtLjrbuKrH-I9D6d8d7ZY7Nn4og2t0BuUPvY3mHyaDqWhaaVNxahlWXJ2qy9D6bE1eU95fl81NlEBOIyXVA_eKfhz5Qr7gd852HZaeXbLZGJmTyi1hQCJdp3F0pmCfy3nvCZjVNw8yL_ObDGQ0VkpsF7IlRTsLOvwy_4QcLNQ2J1jxA4QhmuSx40yZZsssEQIVvvpbtAoy5qkLPvzJteCWxwrHfXrBLvONCl9YWCxauIUUjPYxaF9Rt_N-dSZdXEbGLOKix_BSaWj-jQ_UGYVIlKcRdyorOusSQyug-xbcgJ73HxlxEkZeEh_bY-aKRcmjtUOPW5Zs--byMz6REzUw',
        d: 'Am6QKTgDSGNkar29d-UJST8Tmoj_5mn3aBW9x6SzU8KJxAtUEn2y_TJ-xisxYdio8raZw_1iRpF1Q3CI8QUkci5Jq6_bVD8tCwo8kyJflW19_P18__k28p0ClwVLIJdFcfDQ7s8iS4PTCFo46FpDjZAxlZKHwns8ZFX5fc4tJ-ln-ImzwJ5Jv59dCRoHnvMxWJvLBOxOAtehSDFZ-tTOhqVPk3fKTEe8iDmUukxDLFzwyOWjrnAp4f4v5pmS8a4vIvsrBdBafLUmGgk4l64DXtul5zgsrkk1-cbZaTGXGcFTh4BWm1-55vKFFUgLXbwa9Qje3147Lot8woOuuKzuyQ',
        p: '1LHdG2Am2b6_IoQcZAG5D-2f3-WqAcfDVfbbB1G_u3uwoe-9wSX4NvYVbg_0TLxI0itZafVI2QgBOhNS3XzIY0nFVQ7f2Ru4kMSySf6gG0XvU-7YR0fEB_khXYBJuOSysvzApYpvGtxcbvLPMUc7Py19zLlD_BDzq-uz9urXeu0',
        q: 'zZqdODupMd0CbGqAJYHjbS_a5QY4gB69osfFGuqXNyU8-z-B509-GSDzeuEuB36EJVFyHlee8TRsVwlJIFSTVDGfZIhmoceBjmLbzukQDSTSRvCHFdOx19Y9xh9uotU-sYq8yp6DgUIQE_ReOwNfmJWruEYLlijzlfFXTVucXz8',
        dp: 'jSB7Yne5L4-2SRO5ts3B2oTEKQ69cDL5NGf4SvH-M0tOFxT5JlioSuebrozdf7EK7JEg4gKD1KXQEpXRzO7IE8FWMysMcoVHQJ-S4TAXUiFkPJ_lV96RfuzaK608vXbZ75NvzCd_syX2GxP3UG5ALJplt1pSdsVUuYVKwxJt6b0',
        dq: 'waka4bbAfakw-TGvlqSrtVLYGdUsLvHFqagFbn79BAJdWELPdzMXEVBKRroHgyOWERiQJyhdG9FHIwwqBvvi8fDzs9wO399tltJjPJemeNrv_cXdV5_Y6fZwpUdCDLpTnSOTBD8emwfA4SrR_0AEMVL5Nk8z5rKYDeoPU1wxBD0',
        qi: 'oruW1aM9O9fmuaeUGFSnnnWrrOFcYOTO8thO2gejwNyaAFffjKLQ9eR0ptWgFKTouekjSYIsdsdOB4s2M16wMMeghlCalZ-4zP-5afs8w_zSpvGuvbnE6VaQ4P_UFw1YPjbSxBQnW3cHSToZ4z3l2SiETKB62eW_YD9-mGNHKHA',
        kty: 'RSA',
        kid: 'Ii3PgERA4McI8cFawbCJbKVsYzGckTXo2JtCP2IOwvE',
        use: 'sig',
      },
    ],
  },

  // oidc-provider only looks up the accounts by their ID when it has to read the claims,
  // passing it our Account model method is sufficient, it should return a Promise that resolves
  // with an object with accountId property and a claims method.
  findAccount: OidcAuth.findAccount,

  // let's tell oidc-provider you also support the email scope, which will contain email and
  // email_verified claims
  claims: {
    openid: ['sub'],
    email: ['email', 'email_verified'],
  },

  // let's tell oidc-provider where our own interactions will be
  // setting a nested route is just good practice so that users
  // don't run into weird issues with multiple interactions open
  // at a time.
  interactions: {
    url(ctx, interaction) {
      return `/oidc/interaction/${interaction.uid}`;
    },
  },

  // 추가적인 부가 기능들
  features: {
    // disable the packaged interactions
    devInteractions: { enabled: false },
    encryption: { enabled: true },
    // 토큰 검증기능 on/off
    introspection: {
      enabled: true,
    },
    // // 동적 Client 생성 기능 ( client.js에 등록된 client이외에 추가로 동적으로 등록이 가능하도록 )
    // registration: {
    //   enabled: true,
    //   // 허가되지 않은 사용자의 client 등록을 차단하기위한 secret key.
    //   initialAccessToken: true,
    // },
    // // client 등록에 사용되는 인증 절차에 관한 설정
    // registrationManagement: {
    //   enabled: true,
    //   rotateRegistrationAccessToken: false,
    // },
    // 발급한 토큰을 폐지하는 기능 on/off
    revocation: { enabled: true },
  },
  ttl: {
    AccessToken: 1 * 60 * 60, // 1 hour in seconds
    AuthorizationCode: 10 * 60, // 10 minutes in seconds
    IdToken: 1 * 60 * 60, // 1 hour in seconds
    DeviceCode: 10 * 60, // 10 minutes in seconds
    RefreshToken: 1 * 24 * 60 * 60, // 1 day in seconds
  },
  pkce: {
    methods: ['S256', 'plain'],
    required: () => false,
  },
  renderError: async function renderError(ctx, out, error) {
    console.log('error', error);
    ctx.type = 'html';
    ctx.body = `<!DOCTYPE html>
    <head>
      <title>oops! something went wrong</title>
      <style>/* css and html classes omitted for
       brevity, see lib/helpers/defaults.js */</style>
    </head>
    <body>
      <div>
        <h1>oops! something went wrong</h1>
        ${Object.entries(out)
          .map(
            ([key, value]) =>
              `<pre><strong>${key}</strong>: ${JSON.stringify(value, null, 2)}</pre>`,
          )
          .join('')}
        <pre><strong>message</strong>: ${error.message}</pre>
      </div>
    </body>
    </html>`;
  },
};

export default oidcConfig;
