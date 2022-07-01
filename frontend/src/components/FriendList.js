import React from "react";
import FriendTag from "./FriendTag";
import { useEffect, useState } from "react";

function FriendList() {
    const [friendlist, setFriendList] = useState([]);

    useEffect(() => {
        getFriends();
    }, []);

    const getFriends = () => {
        fetch("http://localhost:3000/api/findf", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.list) {
                    setFriendList(data.list);
                    console.log(friendlist);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    return (
        <div className="frds">
            <div className="frdsHeader">
                <h2> Friends</h2>
            </div>
            <div>
                {friendlist.map((info) => (
                    <FriendTag name={info[0]} email={info[1]} button="chat" />
                ))}
            </div>
        </div>
    );
}

export default FriendList;
