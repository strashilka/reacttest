import React from "react";
import ReactDOM from "react-dom";

export function Avatar(props) {
        return (
            <img
                src={props.user.avatarUrl}
                alt={props.user.name}
                className={props.class}
            />
        );
    }

    export function UserInfo(props) {
        return (
            <div className="UserInfo">
                <Avatar user={props.user}/>
                <div className="UserInfo-name">
                    {props.user.name}
                </div>
            </div>
        );
    }

