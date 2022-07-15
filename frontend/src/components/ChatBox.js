import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";
import TAlert from "./alert";

function ChatBox({ email, groupId }) {
    const [msgs, setMsgs] = useState([]);
    const [message, setInputMsg] = useState("");
    const [title, setTitle] = useState("");
    const autoScroll = useRef();

    const getTitle = () => {
        if (email != "") {
            setTitle(email);
        } else {
            fetch("http://localhost:5050/api/getGroupName", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ groupId }),
            })
                .then((res) => {
                    if (res.status === 400) {
                        // TAlert("Cannot get messages");
                        return;
                    }
                    return res.json();
                })
                .then((data) => {
                    setTitle(data.name);
                });
            // setTitle(groupId);
        }
    };

    const getMessages = () => {
        if (email) {
            //get message list from backend, set to msgs
            fetch("http://localhost:5050/api/getMsg", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
                .then((res) => {
                    if (res.status === 400) {
                        // TAlert("Cannot get messages");
                        return;
                    }
                    return res.json();
                })
                .then((data) => {
                    setMsgs(data.msgs);
                });
        } else {
            //get message list from backend, set to msgs
            fetch("http://localhost:5050/api/getGroupMsg", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ groupId }),
            })
                .then((res) => {
                    if (res.status === 400) {
                        // TAlert("Cannot get messages");
                        return;
                    }
                    return res.json();
                })
                .then((data) => {
                    setMsgs(data.msgs);
                });
        }
    };

    useEffect(() => {
        // console.log("email:");
        // console.log(email);
        // console.log("group:");
        // console.log(groupId);
        getTitle();
    }, [email, groupId]);

    useEffect(() => {
        //console.log(email);
        getMessages();
    });

    const messageList = msgs.map((msg, index) => {
        return (
            <div key={index} className="msgline">
                <div>{!msg.isMe && msg.username}</div>
                <div className={`message-${msg.isMe ? "sent" : "received"}`}>
                    {msg.message}
                </div>
            </div>
        );
    });

    const handleSend = () => {
        if (email) {
            //post msg
            fetch("http://localhost:5050/api/sendMsg", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, message }),
            })
                .then((response) => {
                    if (response.status === 400) {
                        TAlert("Cannot send message!");
                    }
                    return;
                })

                .catch((error) => {
                    console.log("error occured in fetch");
                });
            setInputMsg("");
        } else {
            //post msg
            fetch("http://localhost:5050/api/sendGroupMsg", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ groupId, message }),
            })
                .then((response) => {
                    if (response.status === 400) {
                        TAlert("Cannot send message!");
                    }
                    return;
                })

                .catch((error) => {
                    console.log("error occured in fetch");
                });
            setInputMsg("");
        }
        autoScroll.current.scrollIntoView({ behavior: "auto" });
    };

    return (
        <div className="chatBox">
            <h3>{title}</h3>
            <div className="messages">
                {messageList}
                <div ref={autoScroll}></div>
            </div>
            <div className="inputBar">
                <input
                    onChange={(e) => setInputMsg(e.target.value)}
                    value={message}
                />
                <button onClick={handleSend}>send</button>
            </div>
        </div>
    );
}

export default ChatBox;
