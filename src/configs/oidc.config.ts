import { Configuration } from 'oidc-provider';
import OidcAuth from '../oidc/oidc.auth';
import RedisAdapter from '../oidc/redis.adapter';

const oidcConfig: Configuration = {
  clients: [
    {
      client_id: 'foo',
      redirect_uris: ['https://jwt.io'],
      response_types: ['id_token'],
      grant_types: ['implicit'],
      token_endpoint_auth_method: 'none',
    },
  ],
  adapter: RedisAdapter,
  cookies: {
    keys: [], // 쿠키 변조 방지에 사용되는 키 조합
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
  features: {
    // disable the packaged interactions
    devInteractions: { enabled: false },
  },

  renderError: async function renderError(ctx, out, error) {
    console.log('error', error);
    ctx.type = 'html';
    ctx.body = `<!DOCTYPE html>
    <head>
      <title>oops! something went wrong</title>
      <style>/* css and html classes omitted for brevity, see lib/helpers/defaults.js */</style>
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
