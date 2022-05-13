import { Link, useParams } from 'react-router-dom';
import * as React from 'react';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postsSelectors, Post } from 'store/postsSlice';
import { RootState } from 'store/store';
import { usersSelectors } from 'store/usersSlice';
import PostItem from 'views/Posts/PostItem';
import { ErrorMessage, InfoMessage } from 'utils/utils';
import SelectUsers from 'components/SelectUsers';

const POSTS_PER_PAGE = 5;

function PostsInnerList() {
  // ^^^ I do not know how to make without this component =(
  const posts = useSelector(postsSelectors.selectAll);
  const users = useSelector(usersSelectors.selectAll);

  const loadingStatus = useSelector((state:RootState) => state.posts.status);
  const [curPage, setCurPage] = useState({ selected: 0 });
  const [selectedUser, _setSelectedUser] = useState(null);
  const setSelectedUser = (user: any) => {
    setCurPage({ selected: 0 });
    _setSelectedUser(user);
  };

  if (loadingStatus === 'loading') return <InfoMessage text="Loading posts" />;
  if (loadingStatus === 'failed') return <ErrorMessage text="Posts loading error" />;

  const startIndex = curPage.selected * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  let fullPostsList: Array<Post> = posts;
  if (selectedUser != null && selectedUser.value !== 0) {
    fullPostsList = posts.filter((post:Post) => post.userId === selectedUser.value);
  }

  return (
    <div>
      <p>{`PostsList amount ${fullPostsList.length} current page ${curPage.selected + 1} Posts per page ${POSTS_PER_PAGE}`}</p>
      <SelectUsers users={users} onChange={setSelectedUser} />
      {fullPostsList.slice(startIndex, endIndex).map((post: Post) => (
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
        onPageChange={setCurPage}
        pageRangeDisplayed={2}
        forcePage={curPage.selected}
        pageCount={fullPostsList.length / POSTS_PER_PAGE}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        className="pagination"
        activeClassName="active"
        disabledClassName="grey "
      />
    </div>
  );
}

export default function PostsList() {
  const { postId } = useParams();
  if (undefined !== postId) {
    return <PostItem />;
  }
  return (
    <PostsInnerList />
  );
}
