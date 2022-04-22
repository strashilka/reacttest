import * as React from 'react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Button = styled.button`
  padding: 3px;
  background-color: transparent;
  font-size: 14px;
  font-style: italic;
  color: red;
  border: none;

  &:hover {
    color: blue;
  }
`;

type CommentI = {
    postId: string;
    id: number;
    name: string;
    email: string;
    body: string;
}

type CommentsPropsI = {
    postId: string;
}

export default function Comments({ postId }: CommentsPropsI) {
  const currentPostId = postId;
  const [editingComment, setEditingComment] = useState<CommentI>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<CommentI>>([]);

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/posts/${parseInt(currentPostId, 10)}/comments`)
      .then((response) => response.json())
      .then((json:Array<CommentI>) => {
        if (json !== undefined) {
          setIsLoading(false);
          setComments(json);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        throw (error);
      });
  }, []);

  function onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    const newComment:CommentI = { ...editingComment };
    newComment.body = (event.target as HTMLTextAreaElement).value;
    setEditingComment(newComment);
  }

  function removeComment(commentId: number) {
    fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const newComments = comments.filter((comment: CommentI) => comment.id !== commentId);
        setComments(newComments);
      })
      .catch((error) => {
        throw (error);
      });
  }

  function startEditComment(commentId: number) {
    const comment = comments.filter((editedComment) => editedComment.id === commentId);
    setEditingComment(comment[0]);
  }

  function updateComment() {
    fetch(`https://jsonplaceholder.typicode.com/comments/${editingComment.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        current_comment: editingComment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(() => {
        const newComments = comments.map((comment) => (
          (comment.id === editingComment.id) ? editingComment : comment));

        setEditingComment(null);
        setComments(newComments);
      })
      .catch((error) => {
        throw (error);
      });
  }

  function outputCommentsList() {
    return comments.map((comment) => (
      ((editingComment != null) && (editingComment.id === comment.id))
        ? (
          <li key={comment.id}>
            <textarea
              cols={100}
              rows={5}
              name={editingComment.id.toString()}
              value={editingComment.body}
              className="multiline"
              onChange={onChange}
              onBlur={updateComment}
            />
          </li>
        )
        : (
          <li key={comment.id}>
            <p>
              <b><i>{comment.email}</i></b>
              {' '}
              {comment.body}
              <Button type="button" onClick={() => startEditComment(comment.id)}>
                Edit
              </Button>
              <Button type="button" onClick={() => removeComment(comment.id)}>
                Remove
              </Button>
            </p>
          </li>
        )));
  }

  if (!isLoading) {
    return (
      <ul>
        {outputCommentsList()}
      </ul>
    );
  }

  return <div>Loading comments...</div>;
}
