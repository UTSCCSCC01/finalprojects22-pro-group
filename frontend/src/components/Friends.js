import React from "react";
import "./Friends.css";
import Sidebar from "./Sidebar";
import FriendList from "./FriendList";
import { useEffect, useState } from "react";
import FriendTag from "./FriendTag";

function Friends() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [email_back, setEmailback] = useState("");

    useEffect(() => {
        searchUser();
    }, [email]);

    const searchUser = () => {
        fetch("http://localhost:3000/api/searchf", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                if (data.info) {
                    console.log(data.info[0]);
                    setName(data.info[0]);
                    setEmailback(data.info[1]);
                }
            })
            .catch((error) => {
                console.log("error");
            });
    };

    return (
        <div className="friends">
            <Sidebar />

            <FriendList listtype="Friends" />
            <FriendList listtype="Received requests" />
            <FriendList listtype="Requests sent" />

            <div className="frdSearchBar">
                <input
                    className="inputfield"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                {/* <button className="searchButton" onClick={searchUser}>
                    Search
                </button> */}
                <FriendTag name={name} email={email_back} button="add" />
            </div>
        </div>
    );
}

export default Friends;
