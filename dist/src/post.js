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
import React from 'react';
import { useParams } from "react-router-dom";
import { Comments } from "./comments";
export function Post(props) {
    var params = useParams();
    var post_id = params.postId;
    return React.createElement(PostInner, { postId: post_id });
}
var PostInner = /** @class */ (function (_super) {
    __extends(PostInner, _super);
    function PostInner(props) {
        var _this = 
        // console.log("constructor");
        _super.call(this, props) || this;
        _this.state = {
            postId: props.postId,
            currentPost: null,
            posts: []
        };
        return _this;
    }
    PostInner.prototype.componentDidMount = function () {
        // console.log("componentDidMount");
        var post_id = this.state.postId;
        this.getPostById(post_id);
    };
    PostInner.prototype.getPostById = function (post_id) {
        // console.log("getPostById");
        //fetching post
        var post = this.state.posts.find(function (post) { return post.id === post_id; });
        if (post) {
            console.log("getPostById 1");
            this.setState({
                currentPost: post
            });
        }
        else {
            // console.log("getPostById 2");
            this.fetchPost(post_id);
            // requesst and save
        }
        this.setState({
            currentPost: null
        });
    };
    PostInner.prototype.fetchPost = function (post_id) {
        var _this = this;
        fetch("https://jsonplaceholder.typicode.com/posts/" + post_id)
            .then(function (response) { return response.json(); })
            .then(function (json) {
            if (json != undefined) {
                _this.setState({
                    currentPost: json
                });
            }
        });
    };
    PostInner.prototype.render = function () {
        var outlet;
        if (this.state.currentPost) {
            outlet = React.createElement("div", { key: this.state.currentPost.id },
                React.createElement("h3", { className: "postTitle" }, this.state.currentPost.title),
                React.createElement("p", { className: "postBody" }, this.state.currentPost.body),
                React.createElement(Comments, { postId: this.state.currentPost.id }));
        }
        else {
            outlet = React.createElement("h3", null, "Fetching");
        }
        return (outlet);
    };
    return PostInner;
}(React.Component));
