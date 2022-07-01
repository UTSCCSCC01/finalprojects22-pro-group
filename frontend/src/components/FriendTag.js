import React from "react";
import "./FriendTag.css";

function FriendTag({ name, email, button }) {
    return (
        <div className="friendTag">
            <h3>{name}</h3>
            <h3>{email}</h3>
            <button>{button}</button>
        </div>
    );
}

export default FriendTag;
