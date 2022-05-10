import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Comments from './comments';
import { PostI, selectPostById } from './postsSlice';
import { RootState } from './store';

export default function Post() {
  const { postId } = useParams();
  const post = useSelector<RootState, PostI>((state) => selectPostById(state, postId));

  if (post) {
    return (
      <div key={post.id}>
        <h3 className="postTitle">{post.title}</h3>
        <p className="postBody">{post.body}</p>
        <Comments postId={post.id} />
      </div>
    );
  }

  return <h3>Something went wrong</h3>;
}
