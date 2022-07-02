import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Search_page.css";
import List_Stock from "./List_Stock";
import Sidebar from "./Sidebar";

function Search_page() {
    function handleClick(e) {
        const w = window.open("about:blank");
        w.location.href = "html://www.google.com";
    }
    return (
        <div className="flex_container">
            <Sidebar />
            <div className="search_component">
                <h1 className="center">React Search</h1>
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        label="Search"
                    />
                </div>
                <span className="list">
                    <a
                        href="https://www.google.com/finance/quote/GOOGL:NASDAQ?sa=X&ved=2ahUKEwjR-qiQlNj4AhVvhIkEHWH_DucQ3ecFegQIIRAi"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        google
                    </a>
                </span>
                <span className="list">
                    <a
                        href="https://www.google.com/finance/quote/GOOS:TSE"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        goose
                    </a>
                </span>
            </div>
        </div>
    );
}

export default Search_page;
