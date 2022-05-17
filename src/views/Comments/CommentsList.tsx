import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message, MessageType } from 'components/Message/Message';
import {
  fetchCommentsByPostId,
  getCommentsIdsByPostId,
  selectCommentsStatus,
  wasCommentsLoadedByPostId,
} from 'store/commentsSlice';
import { AppDispatch } from 'store/store';
import CommentItem from 'views/Comments/CommentItem';
import { LoadingStatus } from 'utils/LoadingStatus';

type CommentsListProps = {
    postId: number;
}

export default function CommentsList({ postId }: CommentsListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const commentsIds:Array<number> = useSelector(getCommentsIdsByPostId(postId));
  const wasLoaded:boolean = useSelector(wasCommentsLoadedByPostId(postId));
  const loadingStatus = useSelector(selectCommentsStatus);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.Idle && !wasLoaded) {
      dispatch(fetchCommentsByPostId(postId));
    }
  }, [loadingStatus, wasLoaded]);

  if (loadingStatus === LoadingStatus.Loading) return <Message text="CommentsList loading..." />;
  if (loadingStatus === LoadingStatus.Failed) return <Message text="Comments loading error!!!" type={MessageType.Error} />;

  return (
    <ul>
      {commentsIds.map((commentId) => <CommentItem commentId={commentId} key={commentId} />)}
    </ul>
  );
}
