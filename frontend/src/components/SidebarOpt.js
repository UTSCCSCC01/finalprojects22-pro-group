import React from "react";
import "./SidebarOpt.css";
import { useNavigate } from "react-router-dom";

function SidebarOpt({ text, Icon, func }) {
    const navigate = useNavigate();
    const logout = () => {
        fetch("http://localhost:5050/api/logout", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                navigate("/login");
            })
            .catch((error) => {
                console.log("error occured in logout fetch");
            });
    };

    const handleClick = () => {
        if (text == "Logout") {
            logout();
        } else if (text == "BackToLogin") {
            navigate("/login");
        } else if (text == "Home") {
            navigate("/home");
        } else if (text == "Friends") {
            navigate("/friends");
        } else if (text == "HotList") {
            navigate("/hotlist");
        }
    };

    return (
        <button className="sidebarOption" onClick={handleClick}>
            <Icon />
            <h2>{text}</h2>
        </button>
    );
}

export default SidebarOpt;
