> register

```graphql
mutation {
  register(registerInput: {
    username:"wilker"
    password:"123"
    confirmPassword:"123"
    email: "devyz@gmai.com"
  }) {
    username
    token
    email
  }
}
```

> login user

```graphql
mutation {
  login(username: "yee", password: "123"){
    id
    email
    username
    token
  }
}
```

> HTTP HEADERS

```graphql
{
  "Authentication": "Bearer tokenFromLoginUser"
}
```
