import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import Stock from "./components/Stock";

import Login from "./components/Login.js";
import Register from "./components/Register.js";

import Alarmpage from "./components/Alarmpage.js";
import Reset from "./components/Reset.js";
import StockList from "./components/StockList.js";

import Home from "./components/Home";
import Friends from "./components/Friends";
import Search_page from "./components/Search_page";
import ChatPage from "./components/ChatPage";
import GroupPage from "./components/GroupPage";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/register" element={<Register />} />
            <Route path="/alarmpage" element={<Alarmpage />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/home" element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/hotlist" element={<StockList />} />
            <Route path="/search" element={<Search_page />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/group" element={<GroupPage />} />
        </Routes>
    </Router>
);
