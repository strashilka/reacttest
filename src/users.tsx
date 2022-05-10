import * as React from 'react';
import { useSelector } from 'react-redux';
import { UserInterface } from './UserInterface';
import { usersSelectors } from './usersSlice';
import { RootState } from './store';

export default function UsersList() {
  const users = useSelector(usersSelectors.selectAll);
  const loadingStatus = useSelector((state:RootState) => state.users.status);

  if (loadingStatus === 'loading') {
    return (
      <div className="notification">
        Loading
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

  const renderedUserItems = users.map((user: UserInterface) => (
    <p key={user.id}>
      {user.name}
      {' '}
      <a href={user.website}>{user.website}</a>
    </p>
  ));

  return <ul>{renderedUserItems}</ul>;
}

export function Users() {
  return (
    <div>
      <h2>Users list</h2>
      <UsersList />
    </div>
  );
}
