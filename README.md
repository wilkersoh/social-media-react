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

# Call it in client side

```graphql
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
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

# useReducer Flow

> context/auth.js

1. After Submit login or register
2. UserData passing via context, inside object login function
3. Dispatch paylaod data into Switch condition
4. Since it is useContext, we can get the data from **AuthContext**



Faced Error

Login Or Register using **useMutation** 因為少了 key inside the useForm initialState Object 學錯也會造成這個error

那樣就拿不到 **graphQLErrors** return 回來的 errors了 它會 hit到 **networkError** 先

```bash
POST http://localhost:5000/ 400(Bad Request)
```

