import * as React from 'react';
import UserInterface from './UserInterface';

type GetUserListStateInterface = {
    users: Array<UserInterface>;
    isUsersLoading: boolean;
    errorLoadUsers: string;
    URL: string;
}

export class GetUsersList extends React.Component<any, GetUserListStateInterface> {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isUsersLoading: true,
      errorLoadUsers: '',
      URL: 'https://jsonplaceholder.typicode.com/users',
    };

    this.onGetUsersList = this.onGetUsersList.bind(this);
  }

  componentDidMount() {
    const { state } = this;
    fetch(state.URL)
      .then((response) => response.json())
      .then((json) => {
        if (json !== undefined) {
          this.onGetUsersList(json);
        }
      })
      .catch(() => {
        this.setState({
          isUsersLoading: false,
          errorLoadUsers: 'Something went wrong',
        });
      });
  }

  onGetUsersList(usersJson: Array<UserInterface>) {
    // console.log("OK");
    // console.log(users_json);
    this.setState({
      users: usersJson,
      isUsersLoading: false,
      errorLoadUsers: '',
    });
  }

  render() {
    const { state } = this;
    const loadingMessage = state.errorLoadUsers ? <p>{state.errorLoadUsers}</p> : <p>Loading...</p>;
    return (
      state.isUsersLoading ? loadingMessage
        : (
          <div>
            {state.users.map((user: UserInterface) => (
              <p key={user.id}>
                {user.name}
                {' '}
                <a href={user.website}>{user.website}</a>
              </p>
            ))}
          </div>
        )
    );
  }
}

export function Users() {
  return (
    <div>
      <h2>Users list</h2>
      <GetUsersList />
    </div>
  );
}
