import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Search_page.css";
// import List from "./components/List.js"

function Search_page() {
  return (
    <div className="main">
      <h1>React Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      {/* <List></List> */}
    </div>
  );
}

export default Search_page;