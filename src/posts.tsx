import { Link, useParams } from 'react-router-dom';
import * as React from 'react';
import ReactPaginate from 'react-paginate';
import { ReactNode } from 'react';
import Select from 'react-select';
import PostInterface from './PostInterface';
import Post from './post';

const POSTS_PER_PAGE = 5;

type UserShortInfoI = {
    id: number,
    name: string
}

type GetPostListStateI = {
    currentPage: number;
    posts: Array<PostInterface>;
    users: Array<UserShortInfoI>;
}

export class GetPostList extends React.Component<any, GetPostListStateI> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: -1,
      posts: [],
      users: [],
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.onFilterByUser = this.onFilterByUser.bind(this);
  }

  componentDidMount() {
    this.fetchAllPosts();
  }

  onPageChange(selectedItem: { selected: number }) {
    this.setState({
      currentPage: selectedItem.selected,
    });
  }

  onFilterByUser(newValue: any) {
    const userId: number = newValue.value;

    if (Number.isNaN(userId) || userId === 0) {
      this.fetchAllPosts();
      return;
    }

    // console.log("https://jsonplaceholder.typicode.com/users/" + user_id + "/posts");
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then((response) => response.json())
      .then((json) => {
        if (json !== undefined) {
          this.setState({
            posts: json,
            currentPage: 0,
          });
        }
      });
  }

  currentPagePostsList() {
    const { state } = this;
    const startIndex = state.currentPage * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsForPage = state.posts.slice(startIndex, endIndex);

    return postsForPage.map((post) => (
      <div key={post.id}>
        <h3 className="postTitle">{post.title}</h3>
        <p className="postBody">
          {post.body}
          <Link
            to={`/posts/${post.id}`}
            key={post.id}
          >
            {' '}
            read...
          </Link>
        </p>
      </div>
    ));
  }

  private processPosts(json: Array<PostInterface>) {
    const users: Array<UserShortInfoI> = [];
    json.map((post) => {
      const user: UserShortInfoI = {
        id: 0,
        name: '',
      };
      user.id = post.userId;
      user.name = `User number ${post.userId}`;

      if (users.findIndex((x) => x.id === user.id) === -1) { users.push(user); }

      return user;
    });
    this.setState({
      posts: json,
      currentPage: 0,
      users,
    });
  }

  fetchAllPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        if (json !== undefined) {
          this.processPosts(json);
        }
      })
      .catch((error) => {
        throw (error);
      });
  }

  outputUsers() {
    const options = [];
    options.push({
      value: 0,
      label: '--- Do not filter ---',
    });
    const { state } = this;
    state.users.map((user: UserShortInfoI) => options.push({
      value: user.id,
      label: user.name,
    }));

    return <Select options={options} onChange={this.onFilterByUser} />;
  }

  render() {
    let output : ReactNode;
    const { state } = this;
    if (state.posts.length === 0) {
      output = <p>Fetching...</p>;
    } else {
      output = (
        <p>
          Posts number
          {state.posts.length}
          {' '}
          current page
          {state.currentPage + 1}
          {' '}
          posts per page
          {POSTS_PER_PAGE}
        </p>
      );
    }

    return (
      <div>
        {output}
        {this.outputUsers()}
        {this.currentPagePostsList()}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={this.onPageChange}
          pageRangeDisplayed={2}
          forcePage={state.currentPage}
          pageCount={state.posts.length / POSTS_PER_PAGE}
          previousLabel="< prev"
          renderOnZeroPageCount={null}
          className="pagination"
          activeClassName="active"
          disabledClassName="grey"
        />
      </div>
    );
  }
}

export default function Posts() {
  const params = useParams();
  const { postId } = params;
  if (undefined !== postId) {
    return <Post />;
  }
  return (
    <div>
      <GetPostList />
    </div>
  );
}
