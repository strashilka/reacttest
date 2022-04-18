import React from "react";
export function Avatar(props) {
    return (React.createElement("img", { src: props.user.avatarUrl, alt: props.user.name, className: props.class }));
}
export function UserInfo(props) {
    return (React.createElement("div", { className: "UserInfo" },
        React.createElement(Avatar, { user: props.user }),
        React.createElement("div", { className: "UserInfo-name" }, props.user.name)));
}
