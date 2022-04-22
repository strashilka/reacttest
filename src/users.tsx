import * as React from 'react';
import { useState, useEffect } from 'react';
import { UserInterface } from './UserInterface';

export function GetUsersList() {
  const url:string = 'https://jsonplaceholder.typicode.com/users';
  const [isUsersLoading, setIsUsersLoading] = useState<Boolean>(true);
  const [errorLoadUsers, setErrorLoadUsers] = useState<String>('');
  const [users, setUsers] = useState<Array<UserInterface>>([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((jsonUsers:Array<UserInterface>) => {
        if (jsonUsers !== undefined) {
          setErrorLoadUsers('');
          setUsers(jsonUsers);
        } else {
          setErrorLoadUsers('Users array is empty');
        }
        setIsUsersLoading(false);
      })
      .catch((error) => {
        setIsUsersLoading(false);
        setErrorLoadUsers('Something went wrong');
        throw (error);
      });
  }, []);

  function hasUsers():Boolean {
    return users.length > 0;
  }

  function renderUsersTable() {
    return (
      <div>
        {users.map((user: UserInterface) => (
          <p key={user.id}>
            {user.name}
            {' '}
            <a href={user.website}>{user.website}</a>
          </p>
        ))}
      </div>
    );
  }

  function renderUsersMessage() {
    if (isUsersLoading) {
      return <p>Loading...</p>;
    }

    return <p>{errorLoadUsers}</p>;
  }

  if (hasUsers()) {
    return renderUsersTable();
  }

  return renderUsersMessage();
}

export function Users() {
  return (
    <div>
      <h2>Users list</h2>
      <GetUsersList />
    </div>
  );
}
