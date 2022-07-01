import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Search_box.css"

const SearchBar = () => (
    <div className="main">
        <button type="submit" className="button">Search</button>
        <input className="box"
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s" 
        />
    </div>
);

export default SearchBar;
