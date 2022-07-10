import React from "react";
import Sidebar from "./Sidebar";
import FriendList from "./FriendList";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./ChatPage.css";

function ChatPage() {
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState({});

    const handleSend = () => {
        console.log("here");
        socket.emit("message", message);
        setMessage("");
    };

    useEffect(() => {
        const newSocket = io("http://localhost:5050");
        setSocket(newSocket);
        // console.log(socket.id);
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        // console.log("?????????????????????");
        if (socket == null) return;
        const messageListener = (message) => {
            console.log(message);

            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                newMessages[message.id] = message;
                return newMessages;
            });
        };

        // const deleteMessageListener = (messageID) => {
        //   setMessages((prevMessages) => {
        //     const newMessages = {...prevMessages};
        //     delete newMessages[messageID];
        //     return newMessages;
        //   });
        // };

        socket.on("message", messageListener);
        // socket.on('deleteMessage', deleteMessageListener);
        // socket.emit("getMessages");

        // return () => {
        //     socket.off("message", messageListener);
        //   socket.off('deleteMessage', deleteMessageListener);
        // };
        return;
    }, [socket]);

    return (
        <div className="chat_page">
            <Sidebar />
            <div className="chat_container">
                <div className="chat_header">
                    <h2> Chats </h2>
                </div>
                <div className="flex_container">
                    <div className="chat_body">
                        <div className="messages">
                            {[...Object.values(messages)]
                                // .sort((a, b) => a.time - b.time)
                                .map((message) => (
                                    <div
                                        key={message.id}
                                        className="message-container"
                                        // title={`Sent at ${new Date(
                                        //     message.time
                                        // ).toLocaleTimeString()}`}
                                    >
                                        {/* <span className="user">
                                            {message.user.name}:
                                        </span> */}
                                        <span className="message">
                                            {message.value}
                                        </span>
                                        {/* <span className="date">
                                            {new Date(
                                                message.time
                                            ).toLocaleTimeString()}
                                        </span> */}
                                    </div>
                                ))}
                        </div>
                        <input
                            className="inputfield"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></input>
                        <button className="sendBt" onClick={handleSend}>
                            Send
                        </button>
                    </div>

                    <div className="friend_list">
                        <FriendList listtype="Friends" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
