var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
export function Users() {
    return (React.createElement("div", null,
        React.createElement("h2", null, "Users list"),
        React.createElement(GetUsersList, { url: "https://jsonplaceholder.typicode.com/users" })));
}
var GetUsersList = /** @class */ (function (_super) {
    __extends(GetUsersList, _super);
    function GetUsersList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            users: [],
            isUsersLoading: true,
            errorLoadUsers: "",
            URL: props.url
        };
        _this.onGetUsersList = _this.onGetUsersList.bind(_this);
        return _this;
    }
    GetUsersList.prototype.componentDidMount = function () {
        var _this = this;
        fetch(this.state.URL)
            .then(function (response) { return response.json(); })
            .then(function (json) {
            if (json !== undefined) {
                _this.onGetUsersList(json);
            }
        })
            .catch(function (error) {
            console.log(error);
            _this.setState({
                isUsersLoading: false,
                errorLoadUsers: "Something went wrong"
            });
        });
    };
    GetUsersList.prototype.onGetUsersList = function (users_json) {
        this.setState({
            users: users_json,
            isUsersLoading: false,
            errorLoadUsers: ""
        });
    };
    GetUsersList.prototype.render = function () {
        return ((this.state.isUsersLoading) ?
            (this.state.errorLoadUsers ? React.createElement("p", null, this.state.errorLoadUsers) : React.createElement("p", null, "Loading...")) :
            React.createElement("div", null, this.state.users.map(function (user) {
                return React.createElement("p", { key: user.id },
                    user.name,
                    " ",
                    React.createElement("a", { href: user.website }, user.website));
            })));
    };
    return GetUsersList;
}(React.Component));
export { GetUsersList };
