## 1. 설치

```shell
$ yarn ci
```

## 2. 시작
```shell
# 개발용 시작
$ yarn start:dev
# 실서버용 시작
$ yarn start
```

## 3. 테스트
```
# openid configuration
http://localhost:3000/.well-known/openid-configuration
# openid test
http://localhost:3000/auth?client_id=foo&response_type=id_token&redirect_uri=https%3A%2F%2Fjwt.io&scope=openid&nonce=foobar
# response type code test
http://localhost:3000/oidc/auth?client_id=bar&response_type=code&redirect_uri=https%3A%2F%2Fjwt.io&scope=openid%20email&nonce=foobar&code_challenge=elU6u5zyqQT2f92GRQUq6PautAeNDf4DQPayyR0ek_c&
code_challenge_method=S256
```
