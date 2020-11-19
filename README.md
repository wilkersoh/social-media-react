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

> createComment
```graphql
mutation createComment {
  createComment(postId: "5fb68ab5469de13e947ebc24", body: "create new comment 01") {
    body ## The Post Body
    username
    comments {
      username
      body ## The Comments body
    }
  }
}
```

> deleteComment

```graphql
mutation deleteComment {
  deleteComment(postId: "5fb68ab5469de13e947ebc24", commentId: "5fb69750d43b384408dd8f22") {
    body
    comments {
      body
    }
  }
}
```

> subscription

it will listening the post update, if new post coming in it will updated.

**resolvers/posts**
```javascript
ctx.pubsub.publish("NEW_POST", {
  newPost: post,
});
```

```graphql
subscription newPost {
  newPost {
    id
    body
    username
    createdAt
    comments {
      body
    }
    likes {
      username
    }
  }
}
```
