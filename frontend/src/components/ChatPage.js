import React from "react";
import Sidebar from "./Sidebar";
import FriendList from "./FriendList";
import { useState, useEffect, useRef } from "react";
import "./ChatPage.css";
import ChatBox from "./ChatBox";
import { useLocation } from "react-router-dom";

function ChatPage() {
    const location = useLocation();
    const [email, setEmail] = useState("");

    useEffect(() => {
        setEmail(location.state);
    }, []);

    return (
        <div className="chat_page">
            <Sidebar />
            <div className="chat_component">
                <div className="chatHeader">
                    <h2> Chat</h2>
                </div>
                <div className="chat_down">
                    <div className="friend_list">
                        <FriendList listtype="Friends" />
                    </div>
                    <ChatBox email={email} />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
