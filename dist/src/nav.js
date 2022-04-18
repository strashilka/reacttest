import * as React from 'react';
import { Link } from "react-router-dom";
export function NavigationMenu() {
    return React.createElement("div", null,
        React.createElement(Link, { to: "/posts" }, "Posts"),
        " ",
        React.createElement(Link, { to: "/users" }, "Users"));
}
