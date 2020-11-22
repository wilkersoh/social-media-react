import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm, Popup } from "semantic-ui-react";

import MyPopup from "../util/MyPopup";
import { FETCH_POSTS_QUERY } from "../util/graphql";

export default function DeleteButton(props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = props.commentId
    ? DELETE_COMMENT_MUTATION
    : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy, result) {
      setConfirmOpen(false);
      // TODO: remove post from cache
      if (!props.commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== props.postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }

      // back to home page
      if (props.callback) props.callback();
    },
    variables: {
      postId: props.postId,
      commentId: props.commentId,
    },
  });

  return (
    <>
      <MyPopup content={props.commentId ? "Delete comment" : "Delete post"}>
        <Button
          as='div'
          color='red'
          floated='right'
          onClick={() => setConfirmOpen(true)}>
          <Icon name='trash' style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
