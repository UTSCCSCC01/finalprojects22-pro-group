import React from "react";
import Sidebar from "./Sidebar";
import FriendList from "./FriendList";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
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
            <ChatBox email={email} />
            <FriendList listtype="Friends" />
        </div>
    );
}

// function ChatPage() {
//     const [message, setMessage] = useState("");
//     const [socket, setSocket] = useState(null);
//     const nodeRef = useRef();

//     const handleSend = () => {
//         console.log("here");
//         socket.emit("message", message);
//         setMessage("");
//     };

//     useEffect(() => {
//         const newSocket = io("http://localhost:5050");
//         setSocket(newSocket);
//         // console.log(socket.id);
//         return () => newSocket.close();
//     }, [setSocket]);

//     useEffect(() => {
//         // console.log("?????????????????????");
//         if (socket == null) return;
//         const messageListener = (data) => {
//             console.log(data);
//             console.log(data.message);
//             console.log(nodeRef.current.children);
//             const add = data.message;
//             console.log(add);
//             nodeRef.current.innerHTML += add;
//             //message.message
//             // just append to the div
//         };

//         // const deleteMessageListener = (messageID) => {
//         //   setMessages((prevMessages) => {
//         //     const newMessages = {...prevMessages};
//         //     delete newMessages[messageID];
//         //     return newMessages;
//         //   });
//         // };

//         socket.on("message", (data) => {
//             messageListener(data);
//         });

//         socket.on("all_messages", (data) => {
//             console.log(data);
//             if (data.length) {
//                 data.forEach((message) => {
//                     console.log(message);
//                     messageListener(message);
//                 });
//             }
//         });

//         // socket.on('deleteMessage', deleteMessageListener);
//         // socket.emit("getMessages");

//         // return () => {
//         //     socket.off("message", messageListener);
//         //   socket.off('deleteMessage', deleteMessageListener);
//         // };
//         return;
//     }, [socket]);

//     return (
//         <div className="chat_page">
//             <Sidebar />
//             <div className="chat_container">
//                 <div className="chat_header">
//                     <h2> Chats </h2>
//                 </div>
//                 <div className="flex_container">
//                     <div className="message-list">
//                         <span ref={nodeRef}>sfdfds</span>
//                     </div>
//                     <div className="input_body">
//                         <input
//                             className="inputfield"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                         ></input>
//                         <button className="sendBt" onClick={handleSend}>
//                             Send
//                         </button>
//                     </div>

//                     <div className="friend_list">
//                         <FriendList listtype="Friends" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default ChatPage;
