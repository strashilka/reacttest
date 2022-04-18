import * as React from 'react';
import {useParams} from "react-router-dom";
import {Comments} from "./comments";
import PostInterface from "./PostInterface";

interface PostInnerPropsI{
    postId: string;
}

interface PostInnerStateI{
    postId: string;
    currentPost: PostInterface;
    posts: Array<PostInterface>
}

export function Post(){
    let params = useParams();
    let post_id  = params.postId;

    return <PostInner postId={post_id}/>;
}

class PostInner extends React.Component<PostInnerPropsI, PostInnerStateI>{
    constructor(props:PostInnerPropsI) {
        super(props);
        this.state = {
            postId: props.postId,
            currentPost:null,
            posts: []
        }
    }

    componentDidMount() {
        let post_id  = this.state.postId;
        this.getPostById(post_id);
    }

    getPostById(post_id: string) {
        // console.log("getPostById");
        //fetching post
        let post = this.state.posts.find((post) => post.id === post_id);
        if (post)
        {
            console.log("getPostById 1");
            this.setState({
                currentPost: post
            })
        }
        else
        {
            // console.log("getPostById 2");
            this.fetchPost(post_id);
            // requesst and save
        }

        this.setState({
            currentPost: null
        })

    }

    fetchPost(post_id: string){
        fetch("https://jsonplaceholder.typicode.com/posts/" + post_id)
            .then((response) => response.json())
            .then((json) => {
                if (json !== undefined) {
                    this.setState({
                        currentPost: json
                    });
                }
            });
    }

    render() {
        let outlet : any;//JSX.Element;
        if (this.state.currentPost){
            outlet = <div key={this.state.currentPost.id}>
                <h3 className="postTitle">{this.state.currentPost.title}</h3>
                <p className="postBody">{this.state.currentPost.body}</p>
                <Comments postId={this.state.currentPost.id}/>
            </div>;
        }
        else
        {
            outlet = <h3>Fetching</h3>;
        }
        return (outlet);
    }

    // let params = useParams();
    // let post_id = params.postId;
    // let post = getPost(post_id);
    // console.log(params);
    // return <div>
    //     <h2>{post.title}</h2>
    //     <p>{post.body}</p>
    //     <Comments/>
    // </div>;
}
