import * as React from 'react';
import { useSelector } from 'react-redux';
import Comments from './comments';
import { PostI, selectPostById } from './postsSlice';
import { RootState } from './store';

export type PostProps={
    postId:number
}

export default function Post(props:PostProps) {
  const { postId } = props;
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
