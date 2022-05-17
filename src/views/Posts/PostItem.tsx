import * as React from 'react';
import { useSelector } from 'react-redux';
import CommentsList from 'views/Comments/CommentsList';
import { selectPostById } from 'store/postsSlice';
import { RootState } from 'store/store';
import { useParams } from 'react-router-dom';

export default function PostItem() {
  const { postId } = useParams();
  const post = useSelector((state:RootState) => selectPostById(state, Number(postId)));
  if (post) {
    return (
      <div key={post.id}>
        <h3 className="postTitle">{post.title}</h3>
        <p className="postBody">{post.body}</p>
        <CommentsList postId={post.id} />
      </div>
    );
  }

  return <h3>Something went wrong</h3>;
}
