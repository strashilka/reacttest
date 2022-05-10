import * as React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationMenu() {
  return (
    <div>
      <Link to="/" id="postsMain">Main</Link>
      {' | '}
      <Link to="/posts" id="postsLink">Posts</Link>
      {' | '}
      <Link to="/users" id="usersLink">Users</Link>
    </div>
  );
}
