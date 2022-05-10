import { Link, useParams } from 'react-router-dom';
import * as React from 'react';
import ReactPaginate from 'react-paginate';
import { ReactNode, useState } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { postsSelectors, PostI } from './postsSlice';
import Post from './post';
import { RootState } from './store';
import { usersSelectors } from './usersSlice';
import { UserInterface } from './UserInterface';

const POSTS_PER_PAGE = 5;

export function PostsList() {
  const posts = useSelector(postsSelectors.selectAll);
  const users = useSelector(usersSelectors.selectAll);
  const loadingStatus = useSelector((state:RootState) => state.posts.status);
  const [currentPage, setCurrentPage] = useState({ selected: 0 });
  const [selectedUser, _setSelectedUser] = useState(null);
  const setSelectedUser = (sUser: any) => {
    setCurrentPage({ selected: 0 });
    _setSelectedUser(sUser);
  };

  if (loadingStatus === 'loading') {
    return (
      <div className="notification">
        Loading posts...
      </div>
    );
  }

  if (loadingStatus === 'failed') {
    return (
      <div className="error">
        Loading error!!!
      </div>
    );
  }

  const startIndex = currentPage.selected * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  let fullPostsList: Array<PostI> = posts;
  if (selectedUser != null && selectedUser.value !== 0) {
    fullPostsList = posts.filter((post:PostI) => post.userId === selectedUser.value);
  }

  const postsForPage = fullPostsList.slice(startIndex, endIndex);
  const renderedPotsItems = postsForPage.map((post: PostI) => (
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

  function outputInfo() {
    if (posts.length === 0) {
      return <p>Fetching...</p>;
    }
    return (
      <p>
        {'Posts amount '}
        {fullPostsList.length}
        {' current page '}
        {currentPage.selected + 1}
        {' '}
        {'posts per page '}
        {POSTS_PER_PAGE}
      </p>
    );
  }

  function outputUsersSelect():ReactNode {
    const options = [];
    options.push({
      value: 0,
      label: '--- Do not filter --- ',
    });
    users.map((user: UserInterface) => options.push({
      value: user.id,
      label: user.name,
    }));

    return <Select options={options} onChange={setSelectedUser} />;
  }

  return (
    <div>
      {outputInfo()}
      {outputUsersSelect()}
      {renderedPotsItems}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={setCurrentPage}
        pageRangeDisplayed={2}
        forcePage={currentPage.selected}
        pageCount={fullPostsList.length / POSTS_PER_PAGE}
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
      <PostsList />
    </div>
  );
}
