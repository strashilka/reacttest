import {Link, useParams} from "react-router-dom";
import * as React from "react";
import ReactPaginate from "react-paginate";
import PostInterface from "./PostInterface";
import {Post} from "./post";
import {ReactNode} from "react";
import Select from 'react-select'

const POSTS_PER_PAGE = 5

export default function Posts() {
    let params = useParams();
    let post_id = params.postId;
    if (undefined !== post_id) {
        return <Post/>;
    } else {
        return <div>
            <GetPostList/></div>;
    }
}

interface UserShortInfoI {
    id: number,
    name: string
}

interface GetPostListStateI{
    currentPage: number;
    isFetching: boolean;
    posts: Array<PostInterface>;
    users: Array<UserShortInfoI>;
}

interface GetPostListPropsI{

}

export class GetPostList extends React.Component<GetPostListPropsI, GetPostListStateI> {
    constructor(props: GetPostListPropsI) {
        super(props);
        this.state = {
            currentPage: -1,
            isFetching: true,
            posts: [],
            users: []
        }

        this.onPageChange = this.onPageChange.bind(this);
        this.onFilterByUser = this.onFilterByUser.bind(this);
    }

    componentDidMount() {
        this.fetchAllPosts();
    }

    fetchAllPosts() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((json) => {
                if (json !== undefined) {
                    this.processPosts(json);
                }
            })
            .catch(reason => {
                console.log(reason)
            })

    }

    private processPosts(json: Array<PostInterface>) {
        let users: Array<UserShortInfoI> = [];
        json.map((post) => {
            let user: UserShortInfoI = {
                id: 0,
                name: ""
            }
            user.id = post.userId;
            user.name = "User number " + post.userId;

            if (users.findIndex(x => x.id === user.id) === -1)
                users.push(user);

            return user;
        })
        this.setState({
            posts: json,
            currentPage: 0,
            users: users
        });

    }

    currentPagePostsList() {
        let startIndex = this.state.currentPage * POSTS_PER_PAGE;
        let endIndex = startIndex + POSTS_PER_PAGE;
        let posts_for_page = this.state.posts.slice(startIndex, endIndex)

        return posts_for_page.map((post) =>
            <div key={post.id}>
                <h3 className="postTitle">{post.title}</h3>
                <p className="postBody">{post.body}
                <Link
                    to={`/posts/${post.id}`}
                    key={post.id}
                > read...</Link>
                </p>
            </div>);

    }

    onPageChange(selectedItem: { selected: number }) {
        this.setState({
            currentPage: selectedItem.selected
        })
    }

    onFilterByUser(newValue: any) {
        let user_id: number = newValue.value;

        if (isNaN(user_id) || user_id === 0) {
            this.fetchAllPosts();
            return;
        }

        // console.log("https://jsonplaceholder.typicode.com/users/" + user_id + "/posts");
        fetch("https://jsonplaceholder.typicode.com/users/" + user_id + "/posts")
            .then((response) => response.json())
            .then((json) => {
                if (json !== undefined) {
                    this.setState({
                        posts: json,
                        currentPage: 0
                    });
                }
            });

    }

    render() {
        // console.log("RENDER");

        let output : ReactNode;
        if (this.state.posts.length === 0) {
            output = <p>Fetching...</p>;
        } else {
            output = <p>Posts number {this.state.posts.length} current page {this.state.currentPage + 1} posts per page {POSTS_PER_PAGE} </p>
        }

        return (<div>
            {output}
            {this.outputUsers()}
            {this.currentPagePostsList()}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={this.onPageChange}
                pageRangeDisplayed={2}
                forcePage={this.state.currentPage}
                pageCount={this.state.posts.length / POSTS_PER_PAGE}
                previousLabel="< prev"
                renderOnZeroPageCount={null}
                className="pagination"
                activeClassName="active"
                disabledClassName="grey"
            />
        </div>);
    }

    outputUsers() {
        let options = [];
        options.push({
            value: 0,
            label: "--- Do not filter ---"
        })
        this.state.users.map((user: UserShortInfoI) =>
                options.push({
                    value: user.id,
                    label: user.name
                })
        );

        return <Select options={options} onChange={this.onFilterByUser}/>
    }
}






// function kitcut(text, limit) {
//     // text = text.trim();
//     // if( text.length <= limit) return text;
//     //
//     // text = text.slice(0, limit);
//     //
//     // return text.trim() + "...";
//
//     let str = text.slice(0, limit); //например макс 100 символов
//     let a = str.split(' ');
//     a.splice(a.length - 1, 1);
//     str = a.join(' ');
//     return str + ' ...';
//     //alert(str+' ...');
// }

