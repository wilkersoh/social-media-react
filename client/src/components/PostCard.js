import React, { useContext } from "react";
import { Card, Image, Button, Label, Icon } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

export default function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  const likePost = () => {
    console.log("like post!!");
  };

  const commentOnPost = () => {
    console.log("comment");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button
          as={Link}
          to={`/posts/${id}`}
          labelPosition='right'
          onClick={commentOnPost}>
          <Button basic color='blue'>
            <Icon name='comments' />
          </Button>
          <Label as='label' basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as='div'
            color='red'
            floated='right'
            onClick={() => console.log("Delete post")}>
            <Icon name='trash' style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}
