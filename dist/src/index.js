import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Users } from "./users";
import { NavigationMenu } from "./nav";
import Posts from "./posts";
import { Post } from "./post";
import './index.css';
function App() {
    return React.createElement("div", null,
        React.createElement("h3", null, "\u0422\u0435\u0441\u0442\u043E\u0432\u043E\u0435. \u0417\u0430\u0434\u0430\u0447\u0430:"),
        React.createElement("ul", null,
            React.createElement("li", null, "\u043E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u0441\u0442\u043E\u0432"),
            React.createElement("li", null, "\u043F\u043E\u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043D\u044B\u0439 \u0432\u044B\u0432\u043E\u0434"),
            React.createElement("li", null, "\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u043F\u043E\u0441\u0442\u0435"),
            React.createElement("li", null, "\u0443 \u043F\u043E\u0441\u0442\u0430 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432"),
            React.createElement("li", null, "\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0438\u043C\u0435\u0442\u044C \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439")));
}
ReactDOM.render(React.createElement(BrowserRouter, null,
    React.createElement(NavigationMenu, null),
    React.createElement(Routes, null,
        React.createElement(Route, { path: "/", element: React.createElement(App, null) }),
        React.createElement(Route, { path: "posts", element: React.createElement(Posts, null) },
            React.createElement(Route, { path: ":postId", element: React.createElement(Post, null) })),
        React.createElement(Route, { path: "*", element: React.createElement("p", null, "It's nothing here!") }),
        React.createElement(Route, { path: "users", element: React.createElement(Users, null) }))), document.getElementById('root'));
