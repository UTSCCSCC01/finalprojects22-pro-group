import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Search_page.css";
import List_Stock from "./List_Stock";


function Search_page() {
  return (
    <div>
      <h1 className="center">React Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List_Stock className="center"></List_Stock>

    </div>
  );
}

export default Search_page;