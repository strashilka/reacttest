import * as React from 'react';
import { useSelector } from 'react-redux';
import { UserInterface } from './UserInterface';
import { usersSelectors } from './usersSlice';
import { RootState } from './store';

const styles = {
  ul: {
    listStyle: 'none',
  },
  li: {
    padding: '5px',
  },
};

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

  return (
    <ul style={styles.ul}>
      {users.map((user: UserInterface) => (
        <li key={user.id} style={styles.li}>
          {user.name}
          {' '}
          <a href={user.website}>{user.website}</a>
        </li>
      ))}
    </ul>
  );
}

export function Users() {
  return (
    <div>
      <h2>Users list</h2>
      <UsersList />
    </div>
  );
}
