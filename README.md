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
```
