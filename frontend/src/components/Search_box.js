import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Search_box.css";
import Sidebar from "./Sidebar";

const SearchBar = () => (
    <div>
        <Sidebar />
        <div className="main">
            <button type="submit" className="button">
                Search
            </button>
            <input
                className="box"
                type="text"
                id="header-search"
                placeholder="Search blog posts"
                name="s"
            />
        </div>
    </div>
);

export default SearchBar;
