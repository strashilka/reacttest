import * as React from "react";
import styled from "@emotion/styled";
import {ReactNode} from "react";

const Button = styled.button`
  padding: 3px;
  background-color: transparent;
  font-size: 14px;
  font-style: italic;
  color: red;
  border: none;

  &:hover {
    color: blue;
  }
`

interface CommentI {
    postId: string;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface CommentsPropsI {
    postId: string;
}

interface CommentsStateI {
    postId: string;
    editingComment: CommentI;
    comments: Array<CommentI>;
    prevText: string;
    isLoading: boolean;
}

export class Comments extends React.Component<CommentsPropsI, CommentsStateI> {
    constructor(props: CommentsPropsI) {
        super(props);

        this.state = {
            postId: props.postId,
            editingComment: null,
            isLoading: false,
            comments: [],
            prevText: ""
        }

        this.removeComment = this.removeComment.bind(this);
        this.startEditComment = this.startEditComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getComments = this.getComments.bind(this);
    }

    componentDidMount() {
        this.getComments();
    }

    componentWillUnmount() {
    }

    getComments() {
        this.setState({
            isLoading: true
        });
        fetch("https://jsonplaceholder.typicode.com/posts/" + parseInt(this.state.postId) + "/comments")
            .then((response) => response.json())
            .then((json) => {
                if (json !== undefined) {
                    this.setState({
                        comments: json,
                        isLoading: false
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false
                });
                console.error("!!!");
                console.error(error);
            });
    }

    removeComment(comment_id: number) {
        fetch("https://jsonplaceholder.typicode.com/comments/" + comment_id, {
            method: 'DELETE',
        })
            .then((json) => {
                let comments: Array<CommentI> = this.state.comments;
                let new_comments = comments.filter((comment: CommentI) => comment.id !== comment_id);

                this.setState({
                        comments: new_comments
                    }
                );
            })
            .catch((error) => {
                console.log("DELETE FAILED");
                console.log(error);
            });
    }

    startEditComment(comment_id: number) {
        let comment = this.state.comments.filter((comment) => comment.id === comment_id);
        this.setState({
            editingComment: comment[0]
        })
    }

    onChange(event: React.FormEvent<HTMLTextAreaElement>) {
        let editing_comment = this.state.editingComment;
        editing_comment.body = (event.target as HTMLTextAreaElement).value;

        this.setState({
            editingComment: editing_comment
        })
    }

    updateComment(event: React.SyntheticEvent<EventTarget>) {
        let current_comment = this.state.editingComment;
        fetch("https://jsonplaceholder.typicode.com/comments/" + current_comment.id, {
            method: 'PUT',
            body: JSON.stringify({
                current_comment
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((json) => {
                console.log("UPDATE OK");
                console.log(json);
                let comments = this.state.comments;
                let new_comments = comments.map((comment) => {
                    return (comment.id === current_comment.id) ? current_comment : comment
                });

                console.log(this.state.editingComment);

                this.setState({
                        comments: new_comments,
                        editingComment: null
                    }
                );
            })
            .catch((error) => {
                console.log("UPDATE FAILED");
                console.log(error);
            });
    }

    render() {
        if (this.state.editingComment != null) {
        }

        let output: ReactNode;

        if (this.state.isLoading) {
            output = <div>Loading comments...</div>;
        } else {
            output =
                this.state.comments.map((comment) =>
                    ((this.state.editingComment != null) && (this.state.editingComment.id === comment.id)) ?
                        <li key={comment.id}>
                    <textarea
                        cols={100}
                        rows={5}
                        name={this.state.editingComment.body}
                        value={this.state.editingComment.body}
                        className="multiline"
                        onChange={this.onChange}
                        onBlur={this.updateComment}
                    />
                        </li> :
                        <li key={comment.id}>
                            <p>
                                <b><i>{comment.email}</i></b> {comment.body}
                                <Button type="button" onClick={() => this.startEditComment(comment.id)}>
                                    Edit
                                </Button>
                                <Button type="button" onClick={() => this.removeComment(comment.id)}>
                                    Remove
                                </Button>
                                {/*<i onClick={this.removeComment} data-param={comment.id}>remove</i>*/}
                                {/*{" "}*/}
                                {/*<i onClick={this.startEditComment} data-param={comment.id}>edit</i>*/}
                            </p>
                        </li>
                );
        }


        return <ul>{output}</ul>;
    }
}