import React from "react";
import Sidebar from "./Sidebar";
import GroupList from "./GroupList";
import { useState, useEffect, useRef } from "react";
import "./GroupPage.css";
import ChatBox from "./ChatBox";
import { useLocation } from "react-router-dom";

function GroupPage() {
    const location = useLocation();
    const [groupId, setGroupId] = useState("");
    const [input, setInput] = useState();

    useEffect(() => {
        setGroupId(location.state);
        console.log("GroupPage:");
        console.log(groupId);
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
                        <GroupList listtype="My Groups" />
                    </div>

                    <ChatBox email="" groupId={groupId} />
                </div>
            </div>
        </div>
    );
}

export default GroupPage;
