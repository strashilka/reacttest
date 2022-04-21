import * as React from 'react';
import { useParams } from 'react-router-dom';
import Comments from './comments';
import PostInterface from './PostInterface';

interface PostInnerPropsI {
    postId: string;
}

interface PostInnerStateI {
    postId: string;
    currentPost: PostInterface;
    posts: Array<PostInterface>
}

class PostInner extends React.Component<PostInnerPropsI, PostInnerStateI> {
  constructor(props: PostInnerPropsI) {
    super(props);
    this.state = {
      postId: props.postId,
      currentPost: null,
      posts: [],
    };
  }

  componentDidMount() {
    const { postId } = this.state;
    this.getPostById(postId);
  }

  getPostById(postId: string) {
    // console.log("getPostById");
    // fetching post
    const { state } = this;
    const post = state.posts.find((searchedPost) => searchedPost.id === postId);
    if (post) {
      this.setState({
        currentPost: post,
      });
    } else {
      // console.log("getPostById 2");
      this.fetchPost(postId);
      // requesst and save
    }

    this.setState({
      currentPost: null,
    });
  }

  fetchPost(postId: string) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((json) => {
        if (json !== undefined) {
          this.setState({
            currentPost: json,
          });
        }
      });
  }

  render() {
    let outlet: any;// JSX.Element;
    const { state } = this;
    if (state.currentPost) {
      outlet = (
        <div key={state.currentPost.id}>
          <h3 className="postTitle">{state.currentPost.title}</h3>
          <p className="postBody">{state.currentPost.body}</p>
          <Comments postId={state.currentPost.id} />
        </div>
      );
    } else {
      outlet = <h3>Fetching</h3>;
    }
    return (outlet);
  }
}

export default function Post() {
  const params = useParams();
  const { postId } = params;

  return <PostInner postId={postId} />;
}
