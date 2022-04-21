import * as React from 'react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

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
`;

type CommentI = {
    postId: string;
    id: number;
    name: string;
    email: string;
    body: string;
}

type CommentsPropsI = {
    postId: string;
}

type CommentsStateI = {
    postId: string;
    editingComment: CommentI;
    comments: Array<CommentI>;
    isLoading: boolean;
}

export default class Comments extends React.Component<CommentsPropsI, CommentsStateI> {
  constructor(props: CommentsPropsI) {
    super(props);
    this.state = {
      postId: props.postId,
      editingComment: null,
      isLoading: false,
      comments: [],
    };

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

  onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    const { editingComment } = this.state;
    editingComment.body = (event.target as HTMLTextAreaElement).value;

    this.setState({
      editingComment,
    });
  }

  getComments() {
    this.setState({
      isLoading: true,
    });
    const { state } = this;
    fetch(`https://jsonplaceholder.typicode.com/posts/${parseInt(state.postId, 10)}/comments`)
      .then((response) => response.json())
      .then((json) => {
        if (json !== undefined) {
          this.setState({
            comments: json,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
        throw (error);
      });
  }

  removeComment(commentId: number) {
    fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const { comments } = this.state;
        const newComments = comments.filter((comment: CommentI) => comment.id !== commentId);

        this.setState({
          comments: newComments,
        });
      })
      .catch((error) => {
        throw (error);
      });
  }

  startEditComment(commentId: number) {
    const { state } = this;
    const comment = state.comments.filter((editedComment) => editedComment.id === commentId);
    this.setState({
      editingComment: comment[0],
    });
  }

  updateComment() {
    const { state } = this;
    const currentComment = state.editingComment;
    fetch(`https://jsonplaceholder.typicode.com/comments/${currentComment.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        current_comment: currentComment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(() => {
        const { comments } = this.state;
        const newComments = comments.map((comment) => (
          (comment.id === currentComment.id) ? currentComment : comment));

        this.setState({
          comments: newComments,
          editingComment: null,
        });
      })
      .catch((error) => {
        throw (error);
      });
  }

  render() {
    const { state } = this;
    let output: ReactNode;

    if (state.isLoading) {
      output = <div>Loading comments...</div>;
    } else {
      output = state.comments.map((comment) => ((
        (state.editingComment != null)
                && (state.editingComment.id === comment.id)
      )
        ? (
          <li key={comment.id}>
            <textarea
              cols={100}
              rows={5}
              name={state.editingComment.body}
              value={state.editingComment.body}
              className="multiline"
              onChange={this.onChange}
              onBlur={this.updateComment}
            />
          </li>
        )
        : (
          <li key={comment.id}>
            <p>
              <b><i>{comment.email}</i></b>
              {' '}
              {comment.body}
              <Button type="button" onClick={() => this.startEditComment(comment.id)}>
                Edit
              </Button>
              <Button type="button" onClick={() => this.removeComment(comment.id)}>
                Remove
              </Button>
              {/* <i onClick={this.removeComment} data-param={comment.id}>remove</i> */}
              {/* {" "} */}
              {/* <i onClick={this.startEditComment} data-param={comment.id}>edit</i> */}
            </p>
          </li>
        )));
    }

    return <ul>{output}</ul>;
  }
}
