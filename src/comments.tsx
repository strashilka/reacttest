import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCommentsByPostId, getCommentsIdsByPostId, wasCommentsLoadedByPostId } from './commentsSlice';
import { RootState, store } from './store';
import Comment from './comment';
import { Loading } from './utils';

type CommentsPropsI = {
    postId: string;
}

export default function Comments({ postId }: CommentsPropsI) {
  const currentPostId = parseInt(postId, 10);
  const commentsIds:Array<number> = useSelector(getCommentsIdsByPostId(currentPostId));
  const wasLoaded:boolean = useSelector(wasCommentsLoadedByPostId(currentPostId));
  const loadingStatus = useSelector((state:RootState) => state.comments.status);

  useEffect(() => {
    if (loadingStatus === 'idle' && !wasLoaded) { // && !wasLoaded
      store.dispatch(fetchCommentsByPostId(currentPostId));
    }
  }, [loadingStatus, wasLoaded]);

  if (loadingStatus === 'loading') return <Loading text="Comments loading... " />;

  if (loadingStatus === 'failed') {
    return (
      <div className="error">
        Loading error!!!
      </div>
    );
  }

  return (
    <ul>
      {commentsIds.map((commentId:number) => <Comment commentId={commentId} key={commentId} />)}
    </ul>
  );
}
