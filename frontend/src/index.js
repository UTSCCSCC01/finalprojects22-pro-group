import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Stock from "./components/Stock";
//import Stock_FB from "./Stock_FB";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Reset from "./components/Reset.js";
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
            <Route path="/reset" element={<Reset />} />
        </Routes>
    </Router>
);
