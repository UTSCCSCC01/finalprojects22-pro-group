import { React, useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Search_page.css";
import List_Stock from "./List_Stock";
import Sidebar from "./Sidebar";
import Stock from "./Stock";
import TAlert from "./alert";
import { ToastContainer } from "react-toastify";
function Search_page() {
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        if (input === "") {
            TAlert("Input is invalid!");
            return;
        }
        setSearch(input);
    };

    return (
        <div className="flex_container">
            <Sidebar />
            <div className="search_component">
                <div className="searchHeader">
                    <h2> Search</h2>
                </div>
                <div className="search">
                    <div className="input">
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            fullWidth
                            label="Please type a Stock Name!"
                            sx={{
                                width: "100%",
                                alignItems: "center",
                            }}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            className="searchButton"
                            type="button"
                            onClick={handleSearch}
                            variant="contained"
                            fullWidth
                            // sx={{ mt: 3, mb: 2 }}
                        >
                            Search
                        </Button>
                        <ToastContainer />
                    </div>
                    <Stock stockSymbol={search} />
                </div>
            </div>
        </div>
    );
}

export default Search_page;
