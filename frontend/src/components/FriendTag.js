import React from "react";
import "./FriendTag.css";
import { useNavigate, useLocation } from "react-router-dom";

function FriendTag({ name, email, button }) {
    const navigate = useNavigate();
    // const location = useLocation();

    const handleButton = () => {
        if (button === "add a friend") {
            addfriend();
        } else if (button === "accept") {
            acceptfrd();
        } else if (button === "chat") {
            // if (location.pathname === "/chat") {
            //     setEmail(email);
            // } else {
            navigate("/chat", { state: email });
            // }
        }
        window.location.reload();
    };

    const acceptfrd = () => {
        fetch("http://localhost:5050/api/acceptf", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data) {
                    console.log(data);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    const addfriend = () => {
        fetch("http://localhost:5050/api/addf", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data) {
                    console.log(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="friendTag">
            <div className="info">
                <span>Username: {name}</span>
                <br />
                <span>Email: {email}</span>
            </div>
            <button className="button_div" onClick={handleButton}>
                {button}
            </button>
        </div>
    );
}

export default FriendTag;
