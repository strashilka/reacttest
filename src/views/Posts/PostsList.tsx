import { Link } from 'react-router-dom';
import * as React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Post, selectPostsByUser, selectPostsStatus } from 'store/postsSlice';
import { selectAllUsers } from 'store/usersSlice';
import { Message, MessageType } from 'components/Message/Message';
import SelectUsers from 'components/SelectUsers/SelectUsers';
import { UserOption } from 'views/Users/User';
import { LoadingStatus } from 'utils/LoadingStatus';

const POSTS_PER_PAGE = 5;

export default function PostsList() {
  const [currentPage, setCurrentPage] = useState({ selected: 0 });
  const [selectedUser, _setSelectedUser] = useState(null);

  const posts = useSelector(selectPostsByUser(selectedUser));
  const users = useSelector(selectAllUsers);

  const loadingStatus = useSelector(selectPostsStatus);

  const setSelectedUser = (user: UserOption) => {
    setCurrentPage({ selected: 0 });
    _setSelectedUser((user.value !== 0) ? user : null);
  };

  if (loadingStatus === LoadingStatus.Loading) return <Message text="Loading posts " />;
  if (loadingStatus === LoadingStatus.Failed) return <Message text="Posts loading error" type={MessageType.Error} />;

  const startIndex = currentPage.selected * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  return (
    <div>
      <p>{`PostsList amount ${posts.length} current page ${currentPage.selected + 1} Posts per page ${POSTS_PER_PAGE}`}</p>
      <SelectUsers users={users} onChange={setSelectedUser} />
      {posts.slice(startIndex, endIndex).map((post: Post) => (
        <div key={post.id}>
          <h3 className="postTitle">{post.title}</h3>
          <p className="postBody">
            {post.body}
            <Link to={`/posts/${post.id}`} key={post.id}> read... </Link>
          </p>
        </div>
      ))}
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
        disabledClassName="grey "
      />
    </div>
  );
}
