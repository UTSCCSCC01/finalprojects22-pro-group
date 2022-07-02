import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Search_page.css";
import List_Stock from "./List_Stock";
import Sidebar from "./Sidebar";
import Stock from "./Stock";

function Search_page() {
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        setSearch(input);
    };

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
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <button onClick={handleSearch}>Search</button>
            </div>
            <Stock stockSymbol={search} />
        </div>
    );
}

export default Search_page;
