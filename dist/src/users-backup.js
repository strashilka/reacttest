// import React from 'react';
//
// export function Users() {
//     return <div>
//         <h2>Users list</h2>
//         <GetUsersList url="https://jsonplaceholder.typicode.com/users"/>
//     </div>;
// }
//
// class UserData {
//     id: number,
//     name: string,
//     username: string,
//
//
//
//     "id": 9,
//     "name": "Glenna Reichert",
//     "username": "Delphine",
//     "email": "Chaim_McDermott@dana.io",
//     "address": {
//         "street": "Dayna Park",
//         "suite": "Suite 449",
//         "city": "Bartholomebury",
//         "zipcode": "76495-3109",
//         "geo": {
//             "lat": "24.6463",
//             "lng": "-168.8889"
//         }
//     },
//     "phone": "(775)976-6794 x41206",
//     "website": "conrad.com",
//     "company": {
//         "name": "Yost and Sons",
//         "catchPhrase": "Switchable contextually-based project",
//         "bs": "aggregate real-time technologies"
//     }
// }
//
// export class GetUsersList extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             users: [],
//             isUsersLoading: true,
//             errorLoadUsers: "",
//             URL: props.url
//         }
//
//         this.onGetUsersList = this.onGetUsersList.bind(this);
//     }
//
//     componentDidMount() {
//         fetch(this.state.URL)
//             .then((response) => response.json())
//             .then((json) => {
//                 if (json !== undefined) {
//                     this.onGetUsersList(json)
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//                 this.setState({
//                     isUsersLoading: false,
//                     errorLoadUsers: "Something went wrong"
//                 })
//             });
//     }
//
//     onGetUsersList(users_json) {
//         this.setState({
//             users: users_json,
//             isUsersLoading: false,
//             errorLoadUsers: ""
//         });
//     }
//
//     render() {
//         return (
//             (this.state.isUsersLoading) ?
//                 (this.state.errorLoadUsers ? <p>{this.state.errorLoadUsers}</p> : <p>Loading...</p>) :
//                 <div>
//                     {this.state.users.map((user: UserData) =>
//                         <p key={user.id}>{user.name} <a href={user.website}>{user.website}</a></p>
//                     )}
//                 </div>
//         )
//     }
// }
