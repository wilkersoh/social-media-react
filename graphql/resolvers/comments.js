const { UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, ctx) => {
      const { username } = checkAuth(ctx);
      if (body.trom() === "") {
        throw new UserInputError("empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post Not Found");
      }
    },
  },
};
