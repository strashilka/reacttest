import * as React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  CommentI, editComment, removeComment, selectCommentById,
} from './commentsSlice';
import { RootState, store } from './store';

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

type CommentPropsI = {
    commentId: number;
}

export default function Comment({ commentId }: CommentPropsI) {
  // const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingValue, setCurrentEditingValue] = useState('');
  // const isEditing:boolean = false;
  const comment = useSelector<RootState, CommentI>((state) => selectCommentById(state, commentId));

  function onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    setCurrentEditingValue((event.target as HTMLTextAreaElement).value);
    // const newComment:CommentI = { ...comment };
    // newComment.body = (event.target as HTMLTextAreaElement).value;
  }

  function updateComment() {
    setIsEditing(false);
  }

  useEffect(() => {
    if (currentEditingValue !== ''
        && currentEditingValue !== comment.body
        && isEditing === false) {
      store.dispatch(editComment({
        commentId: comment.id,
        commentBody: currentEditingValue,
      }));
    }
  }, [currentEditingValue, isEditing]);

  function startEdit() {
    setCurrentEditingValue(comment.body);
    setIsEditing(true);
  }

  return (
    (isEditing)
      ? (
        <li key={comment.id}>
          <textarea
            cols={100}
            rows={5}
            name={comment.id.toString()}
            value={currentEditingValue}
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
            <Button type="button" onClick={() => startEdit()}>
              Edit
            </Button>
            <Button
              type="button"
              onClick={() => store.dispatch(removeComment(comment.id))}
            >
              Remove
            </Button>
          </p>
        </li>
      ));
}
