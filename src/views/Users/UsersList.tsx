import * as React from 'react';
import { useSelector } from 'react-redux';
import { usersSelectors } from 'store/usersSlice';
import { RootState } from 'store/store';
import { User } from 'src/views/Users/User';
import { ErrorMessage, InfoMessage } from 'utils/utils';
import { usersListStyles } from './UsersList.styles';

export default function UsersList() {
  const users = useSelector(usersSelectors.selectAll);
  const loadingStatus = useSelector((state:RootState) => state.users.status);

  if (loadingStatus === 'loading') return <InfoMessage text="Loading users list " />;
  if (loadingStatus === 'failed') return <ErrorMessage text="Loading users error!!!" />;

  return (
    <div>
      <h2>Users list</h2>
      <ul style={usersListStyles.ul}>
        {users.map((user: User) => (
          <li key={user.id} style={usersListStyles.li}>
            {user.name}
            {' '}
            <a href={`https://${user.website}`}>{user.website}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
