import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ErrorMessage, InfoMessage } from 'utils/utils';
import { fetchCommentsByPostId, getCommentsIdsByPostId, wasCommentsLoadedByPostId } from 'store/commentsSlice';
import { RootState, store } from 'store/store';
import CommentItem from 'views/Comments/CommentItem';

type CommentsListProps = {
    postId: string;
}

export default function CommentsList({ postId }: CommentsListProps) {
  const currentPostId = parseInt(postId, 10);
  const commentsIds:Array<number> = useSelector(getCommentsIdsByPostId(currentPostId));
  const wasLoaded:boolean = useSelector(wasCommentsLoadedByPostId(currentPostId));
  const loadingStatus = useSelector((state:RootState) => state.comments.status);

  useEffect(() => {
    if (loadingStatus === 'idle' && !wasLoaded) {
      store.dispatch(fetchCommentsByPostId(currentPostId));
    }
  }, [loadingStatus, wasLoaded]);

  if (loadingStatus === 'loading') return <InfoMessage text="CommentsList loading... " />;
  if (loadingStatus === 'failed') return <ErrorMessage text="Comments loading error!!!" />;

  return (
    <ul>
      {commentsIds.map((commentId:number) => <CommentItem commentId={commentId} key={commentId} />)}
    </ul>
  );
}
