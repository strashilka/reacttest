import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers, selectUsersStatus } from 'store/usersSlice';
import { User } from 'views/Users/User';
import { Message, MessageType } from 'components/Message/Message';
import { LoadingStatus } from 'utils/LoadingStatus';
import { usersListStyles } from './UsersList.styles';

export default function UsersList() {
  const users = useSelector(selectAllUsers);
  const loadingStatus = useSelector(selectUsersStatus);

  if (loadingStatus === LoadingStatus.Loading) return <Message text="Loading users list" />;
  if (loadingStatus === LoadingStatus.Failed) return <Message text="Loading users error!!!" type={MessageType.Error} />;

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
