import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './comments';
import PostInterface from './PostInterface';

type PostInnerPropsI = {
    postId: string;
}

function PostInner({ postId }:PostInnerPropsI) {
  const [currentPost, setCurrentPost] = useState<PostInterface>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((json:PostInterface) => {
        if (json !== undefined) {
          setCurrentPost(json);
        }
      });
  }, []);

  if (currentPost) {
    return (
      <div key={currentPost.id}>
        <h3 className="postTitle">{currentPost.title}</h3>
        <p className="postBody">{currentPost.body}</p>
        <Comments postId={currentPost.id} />
      </div>
    );
  }
  return <h3>Fetching</h3>;
}

export default function Post() {
  const params = useParams();
  const { postId } = params;

  return <PostInner postId={postId} />;
}
