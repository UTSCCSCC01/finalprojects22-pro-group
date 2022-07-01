import "./App.css";
import React, { useState } from "react";
import Stock from "./components/Stock";
import Stock_FB from "./components/Stock_FB";

import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Search_page from "./components/Search_page";
import Search_box from "./components/Search_box"


// import Navbars from "./components/Navbars.js";
// import Crypto from "./components/Crypto.js";
// import Clock from "./components/Clock.js";
// import Login from "./components/Login.js";
//alpha vantage key
//THN5ITBH3LFSAWLV

function App() {
    const [StockSymbol, setStockSymbol] = useState("FB");
    return (
      <div className="App">
        {/* <Stock />
        <Stock_FB /> */}
        <Search_box></Search_box>
        <Search_page></Search_page>

        {/* <Login /> */}
        {/*<Register/>*/}
        {/* <Navbars /> */}
        {/* <Login/> */}
        {/* <Clock /> */}
        {/* <Crypto /> */}
      </div>
    );
}

export default App;
