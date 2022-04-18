var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Link, useParams } from "react-router-dom";
import { Post } from "./post";
import React from "react";
import { GetUsersList } from "./users";
import ReactPaginate from "react-paginate";
var POSTS_PER_PAGE = 5;
var URL = "https://jsonplaceholder.typicode.com/";
var USERS = "users";
var URL_USERS_LIST = URL + USERS;
var POTS = "posts";
var USER_POTS = "users/1/posts";
export default function Posts() {
    var params = useParams();
    var post_id = params.postId;
    if (post_id != undefined) {
        //let post=getPost(post_id);
        return React.createElement(Post, { postId: post_id });
    }
    else {
        return React.createElement("div", null,
            React.createElement(GetPostList, null));
    }
}
function PostTitle(props) {
    return React.createElement("h3", { className: "postTitle" }, props.value);
}
function PostBody(props) {
    // console.log(props);
    return React.createElement("p", { className: "postBody" },
        props.value,
        React.createElement(Link, { to: "/posts/".concat(props.id), key: props.id }, "read..."));
}
function PostsInfo(props) {
    return React.createElement("p", null,
        "Posts number ",
        props.count,
        " current page ",
        props.page,
        " posts per page ",
        POSTS_PER_PAGE,
        " ");
}
var GetPostList = /** @class */ (function (_super) {
    __extends(GetPostList, _super);
    function GetPostList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentPage: -1, isFetching: true, posts: [], users: []
        };
        _this.handleGetList = _this.handleGetList.bind(_this);
        _this.onPageChange = _this.onPageChange.bind(_this);
        _this.onFilterByUser = _this.onFilterByUser.bind(_this);
        return _this;
    }
    GetPostList.prototype.handleGetList = function (post_json) {
        var posts = [];
        post_json.map(function (post) {
            // let post_short = post;
            // post_short.body = kitcut(post.body, 100);
            posts.push(post);
        });
        this.setState({
            posts: posts, currentPage: 0
        });
    };
    GetPostList.prototype.componentDidMount = function () {
        this.fetchAllPosts();
    };
    GetPostList.prototype.fetchAllPosts = function () {
        var _this = this;
        try {
            // console.log(URL+POTS);
            fetch(URL + POTS)
                .then(function (response) { return response.json(); })
                .then(function (json) {
                if (json != undefined) {
                    // console.log("request for ALL posts");
                    // console.log(json);
                    _this.handleGetList(json);
                }
            });
        }
        catch (e) {
            // console.log(555555555555555555);
        }
    };
    GetPostList.prototype.currentPagePostsList = function () {
        var startIndex = this.state.currentPage * POSTS_PER_PAGE;
        var endIndex = startIndex + POSTS_PER_PAGE;
        var posts_for_page = this.state.posts.slice(startIndex, endIndex);
        return posts_for_page.map(function (post) {
            return React.createElement("div", { key: post.id },
                React.createElement(PostTitle, { value: post.title }),
                React.createElement(PostBody, { value: post.body, id: post.id }));
        });
    };
    GetPostList.prototype.onPageChange = function (event) {
        // console.log(event.selected);
        this.setState({
            currentPage: event.selected
        });
    };
    GetPostList.prototype.onFilterByUser = function (user_id) {
        // console.log(Number.parseInt(user_id));
        var _this = this;
        if (isNaN(user_id) || user_id == 0) {
            // console.log("is NaN");
            this.fetchAllPosts();
            return;
        }
        fetch(URL + "users/" + user_id + "/posts")
            .then(function (response) { return response.json(); })
            .then(function (json) {
            if (json != undefined) {
                // console.log("request for filter");
                // console.log(json);
                _this.handleGetList(json);
            }
        });
    };
    GetPostList.prototype.render = function () {
        // console.log("RENDER");
        var output = "";
        if (this.state.posts.length == 0) {
            output = React.createElement("p", null, "Fetching...");
        }
        else {
            output = React.createElement(PostsInfo, { count: this.state.posts.length, page: this.state.currentPage + 1 });
        }
        // console.log("STATE BEFORE RENDER");
        // console.log(this.state.currentPage);
        // console.log(this.state.posts.length / POSTS_PER_PAGE);
        return (React.createElement("div", null,
            output,
            React.createElement(GetUsersList, { url: URL_USERS_LIST, onFilterByUser: this.onFilterByUser }),
            this.currentPagePostsList(),
            React.createElement(ReactPaginate, { breakLabel: "...", nextLabel: "next >", onPageChange: this.onPageChange, pageRangeDisplayed: 2, forcePage: this.state.currentPage, pageCount: this.state.posts.length / POSTS_PER_PAGE, previousLabel: "< prev", renderOnZeroPageCount: null, className: "pagination", activeClassName: "active", disabledClassName: "grey" })));
    };
    return GetPostList;
}(React.Component));
export { GetPostList };
function kitcut(text, limit) {
    // text = text.trim();
    // if( text.length <= limit) return text;
    //
    // text = text.slice(0, limit);
    //
    // return text.trim() + "...";
    var str = text.slice(0, limit); //например макс 100 символов
    var a = str.split(' ');
    a.splice(a.length - 1, 1);
    str = a.join(' ');
    return str + ' ...';
    //alert(str+' ...');
}
