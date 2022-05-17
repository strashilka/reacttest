import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as React from 'react';
import NotFound404 from 'views/NotFound404/NotFound404';
import Main from 'views/Main/Main';
import NavigationMenu from 'views/NavigationMenu/NavigationMenu';
import PostItem from 'views/Posts/PostItem';
import PostsList from 'views/Posts/PostsList';
import UsersList from 'views/Users/UsersList';

export default function App() {
  return (
    <BrowserRouter>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts/:postId" element={<PostItem />} />
        <Route path="posts" element={<PostsList />} />
        <Route path="users" element={<UsersList />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}
