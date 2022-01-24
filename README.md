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

```shell
# redis 실행
$ docker-compose up -d
$ yarn run start:dev
```

### 4. flow
```text
# 1. 로그인
✅ http://localhost:8888/oidc/auth?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope=openid%20email%20offline_access

# 1-1. 로그인 응답
☑️ http://localhost:3000/?code=sz5KUxtQFH6eTXMNRIGiHO9VAFBMPK0dk8abpMJ4QVA

# 2. accesss_token 발급
✅ POST http://localhost:8888/oidc/token
{
    headers: {
        Content-Type: application/x-www-form-urlencoded
        Authorization: Base64({client_id}:{client_secret})
    },
    body {
        grant_type: authorization_code,
        redirect_uri: http://localhost:3000,
        code: {code}
    }
}

# 2-1. access_token 발급 응답
☑️ example response
{
	"access_token": "mwV0fcwnQsGSZWbtsWtPi_xv0sbW54LUSe4yjZPYLOc",
	"expires_in": 3600,
	"id_token": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjloNldUaEdCellmSWZrQlpUMDJZVGtxTm41Y1dXVFhUcldSWkRMZUkyMk0ifQ.eyJzdWIiOiIyMzEyMWQzYy04NGRmLTQ0YWMtYjQ1OC0zZDYzYTlhMDU0OTciLCJhdF9oYXNoIjoiNXJPQ0xwY29HdW9ubmQ2ZUxQdUJmZyIsImF1ZCI6InRlc3QiLCJleHAiOjE2NDMwMDI2MzAsImlhdCI6MTY0Mjk5OTAzMCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4ODg4In0.YH8ey6qL2CT4-_58-QoW_JGjHWPd6EZKMtNJ7ybCftfDcK3jWEcD8o9AllveiAr5GEk1NAJ3JTOSEtZ1VcwwxA",
	"scope": "openid email",
	"token_type": "Bearer"
}

# 3. user_info 테스트
✅ http://localhost:8888/oidc/me
{
    headers: {
        Authorization: Bearer mwV0fcwnQsGSZWbtsWtPi_xv0sbW54LUSe4yjZPYLOc
    }
}

# 3-1. user_info 응답
☑️ example response
{
	"sub": "23121d3c-84df-44ac-b458-3d63a9a05497",
	"email": "foo@example.com",
	"email_verified": true
}
```
