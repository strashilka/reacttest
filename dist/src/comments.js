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
import React from "react";
var Comments = /** @class */ (function (_super) {
    __extends(Comments, _super);
    function Comments(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            postId: props.postId,
            editingComment: null,
            comments: [],
            prevText: ""
        };
        _this.removeComment = _this.removeComment.bind(_this);
        _this.startEditComment = _this.startEditComment.bind(_this);
        _this.updateComment = _this.updateComment.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }
    Comments.prototype.componentDidMount = function () {
        this.getComments();
    };
    Comments.prototype.getComments = function () {
        var _this = this;
        // console.log("------------------");
        // console.log(this.state.postId);
        fetch("https://jsonplaceholder.typicode.com/posts/" + parseInt(this.state.postId) + "/comments")
            .then(function (response) { return response.json(); })
            .then(function (json) {
            if (json != undefined) {
                //console.log(json);
                _this.setState({
                    comments: json
                });
            }
        })
            .catch(function (error) {
            console.log("!!!");
            console.log(error);
        });
    };
    Comments.prototype.removeComment = function (event) {
        var _this = this;
        console.log("Remove comment number " + event);
        // console.log(event.target);
        console.log(this.state.currentPost);
        var comment_id = event.target.dataset.param;
        fetch("https://jsonplaceholder.typicode.com/comments/" + comment_id, {
            method: 'DELETE',
        })
            .then(function (json) {
            console.log("DELETE OK");
            console.log(json);
            var comments = _this.state.comments;
            var new_comments = comments.filter(function (comment) { return comment.id != comment_id; });
            _this.setState({
                comments: new_comments
            });
        })
            .catch(function (error) {
            console.log("DELETE FAILED");
            console.log(error);
        });
    };
    Comments.prototype.startEditComment = function (event) {
        var comment_id = event.target.dataset.param;
        // console.log("START EDIT " + comment_id);
        var comment = this.state.comments.filter(function (comment) { return comment.id == comment_id; });
        // console.log(comment[0]);
        this.setState({
            editingComment: comment[0],
            prevEditing: comment[0].body
        });
    };
    Comments.prototype.onChange = function (event) {
        // console.log(event.target.dataset.param);
        // console.log(event.target.dataset);
        // console.log(event.target.value);
        var comment_body = event.target.value; //event.target.dataset.param;
        // console.log("Update comment number " + comment_body);
        var editing_comment = this.state.editingComment;
        editing_comment.body = comment_body;
        this.setState({
            editingComment: editing_comment
        });
        // console.log(editing_comment.body);
    };
    Comments.prototype.updateComment = function (event) {
        var _this = this;
        console.log("ON BLUR");
        var current_comment = this.state.editingComment;
        fetch("https://jsonplaceholder.typicode.com/comments/" + current_comment.id, {
            method: 'PUT',
            body: JSON.stringify({
                current_comment: current_comment
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(function (json) {
            console.log("UPDATE OK");
            console.log(json);
            var comments = _this.state.comments;
            var new_comments = comments.map(function (comment) {
                return (comment.id == current_comment.id) ? current_comment : comment;
            });
            console.log(_this.state.editingComment);
            _this.setState({
                comments: new_comments,
                editingComment: null
            });
        })
            .catch(function (error) {
            console.log("UPDATE FAILED");
            console.log(error);
        });
    };
    Comments.prototype.render = function () {
        var _this = this;
        // console.log("Render comments");
        if (this.state.editingComment != null) {
            //console.log(this.state.editingComment);
            //console.log(this.state.editingComment.id);
        } // console.log(this.state.comments);
        var comments = this.state.comments.map(function (comment) {
            return ((_this.state.editingComment != null) && (parseInt(_this.state.editingComment.id) == parseInt(comment.id))) ?
                React.createElement("li", { key: comment.id },
                    React.createElement("textarea", { type: "textarea", cols: "100", rows: "5", name: _this.state.editingComment.body, value: _this.state.editingComment.body, className: "multiline", onChange: _this.onChange, onBlur: _this.updateComment })) :
                React.createElement("li", { key: comment.id },
                    React.createElement("p", null,
                        React.createElement("b", null,
                            React.createElement("i", null, comment.email)),
                        " ",
                        comment.body,
                        " ",
                        React.createElement("i", { onClick: _this.removeComment, "data-param": comment.id }, "remove"),
                        " ",
                        React.createElement("i", { onClick: _this.startEditComment, "data-param": comment.id }, "edit")));
        });
        return React.createElement("ul", null, comments);
    };
    return Comments;
}(React.Component));
export { Comments };
