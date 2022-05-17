import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Comment, editComment, removeComment, selectCommentById,
} from 'store/commentsSlice';
import { AppDispatch, RootState } from 'store/store';
import { Button, commentItemStyles } from './CommentItem.styles';

type CommentProps = {
    commentId: number;
}

export default function CommentItem({ commentId }: CommentProps) {
  const dispatch:AppDispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingValue, setCurrentEditingValue] = useState('');
  const comment = useSelector<RootState, Comment>((state) => selectCommentById(state, commentId));

  function onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    setCurrentEditingValue((event.target as HTMLTextAreaElement).value);
  }

  function updateComment() {
    setIsEditing(false);
  }

  useEffect(() => {
    if (currentEditingValue !== ''
        && currentEditingValue !== comment.body
        && !isEditing) {
      dispatch(editComment({
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
          <span style={commentItemStyles}>{comment.email}</span>
          {comment.body}
          <Button type="button" onClick={() => startEdit()}>Edit</Button>
          <Button type="button" onClick={() => dispatch(removeComment(comment.id))}>Remove</Button>
        </li>
      ));
}
