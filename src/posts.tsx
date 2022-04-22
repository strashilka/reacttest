import { Link, useParams } from 'react-router-dom';
import * as React from 'react';
import ReactPaginate from 'react-paginate';
import { ReactNode, useEffect, useState } from 'react';
import Select from 'react-select';
import PostInterface from './PostInterface';
import Post from './post';

const POSTS_PER_PAGE = 5;

type UserShortInfoI = {
    id: number,
    name: string
}

export function GetPostList() {
  const [currentPage, setCurrentPage] = useState({ selected: -1 });
  const [posts, setPosts] = useState<Array<PostInterface>>([]);
  const [users, setUsers] = useState<Array<UserShortInfoI>>([]);
  const [selectedUser, setSelectedUser] = useState(null);

  function fetchAllPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json: Array<PostInterface>) => {
        if (json !== undefined) {
          const usersList: Array<UserShortInfoI> = [];
          json.forEach((post) => {
            const user: UserShortInfoI = {
              id: 0,
              name: '',
            };
            user.id = post.userId;
            user.name = `User number ${post.userId}`;

            if (usersList.findIndex((x) => x.id === user.id) === -1) { usersList.push(user); }
          });

          setUsers(usersList);
          setPosts(json);
          setCurrentPage({ selected: 0 });
        }
      })
      .catch((error) => {
        throw (error);
      });
  }

  useEffect(() => {
    fetchAllPosts();
  }, []);

  function handleFilterByUser() {
    if (selectedUser === null || selectedUser.value === 0) {
      fetchAllPosts();
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser.value}/posts`)
      .then((response) => response.json())
      .then((json:Array<PostInterface>) => {
        if (json !== undefined) {
          setPosts(json);
          setCurrentPage({ selected: 0 });
        }
      });
  }

  useEffect(() => {
    handleFilterByUser();
  }, [selectedUser]);

  function currentPagePostsList() {
    const startIndex = currentPage.selected * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsForPage = posts.slice(startIndex, endIndex);

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

  function outputUsersSelect():ReactNode {
    const options = [];
    options.push({
      value: 0,
      label: '--- Do not filter ---',
    });
    users.map((user: UserShortInfoI) => options.push({
      value: user.id,
      label: user.name,
    }));

    return <Select options={options} onChange={setSelectedUser} />;
  }

  function outputInfo() {
    if (posts.length === 0) {
      return <p>Fetching...</p>;
    }
    return (
      <p>
        Posts number
        {posts.length}
        {' '}
        current page
        {currentPage.selected + 1}
        {' '}
        posts per page
        {POSTS_PER_PAGE}
      </p>
    );
  }

  return (
    <div>
      {outputInfo()}
      {outputUsersSelect()}
      {currentPagePostsList()}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={setCurrentPage}
        pageRangeDisplayed={2}
        forcePage={currentPage.selected}
        pageCount={posts.length / POSTS_PER_PAGE}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        className="pagination"
        activeClassName="active"
        disabledClassName="grey"
      />
    </div>
  );
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
