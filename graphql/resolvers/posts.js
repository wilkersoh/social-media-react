const { AuthenticationError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) return post;
        throw new Error("Post not found");
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createPost: async (_, { body }, ctx) => {
      const user = checkAuth(ctx);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },

    deletePost: async (_, { postId }, ctx) => {
      const user = checkAuth(ctx);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new new AuthenticationError("Action not Allowed")();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
