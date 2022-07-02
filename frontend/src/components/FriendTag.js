import React from "react";
import "./FriendTag.css";
import { useNavigate } from "react-router-dom";

function FriendTag({ name, email, button }) {
    const navigate = useNavigate();

    const handleButton = () => {
        if (button == "add a friend") {
            addfriend();
        } else if (button == "accept") {
            acceptfrd();
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
            <h4>{name}:</h4>
            <h4>{email}</h4>
            <button onClick={handleButton}>{button}</button>
        </div>
    );
}

export default FriendTag;
