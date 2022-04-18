import * as React from 'react';
import UserInterface from "./UserInterface";

// interface GetUsersListPropsInterface{
//     url: string;
// }

interface GetUserListStateInterface {
    users: Array<UserInterface>;
    isUsersLoading: boolean;
    errorLoadUsers: string;
    URL: string;
}

export function Users() {
    return (<div>
        <h2>Users list</h2>
        <GetUsersList/>
    </div>);
}

interface GetUsersListPropsI {
    // url: string;
    // onFilterByUser: any;//5555
}

export class GetUsersList extends React.Component<GetUsersListPropsI, GetUserListStateInterface> {
    constructor(props: GetUsersListPropsI) {
        super(props);

        this.state = {
            users: [],
            isUsersLoading: true,
            errorLoadUsers: "",
            URL: "https://jsonplaceholder.typicode.com/users"
        }

        this.onGetUsersList = this.onGetUsersList.bind(this);
    }

    componentDidMount() {
        fetch(this.state.URL)
            .then((response) => response.json())
            .then((json) => {
                if (json !== undefined) {
                    this.onGetUsersList(json)
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    isUsersLoading: false,
                    errorLoadUsers: "Something went wrong"
                })
            });
    }

    onGetUsersList(users_json: Array<UserInterface>) {
        // console.log("OK");
        // console.log(users_json);
        this.setState({
            users: users_json,
            isUsersLoading: false,
            errorLoadUsers: ""
        });
    }

    render() {
        return (
            (this.state.isUsersLoading) ?
                (this.state.errorLoadUsers ? <p>{this.state.errorLoadUsers}</p> : <p>Loading...</p>) :
                <div>
                    {this.state.users.map((user: UserInterface) =>
                        <p key={user.id}>{user.name} <a href={user.website}>{user.website}</a></p>
                    )}
                </div>
        )
    }
}
