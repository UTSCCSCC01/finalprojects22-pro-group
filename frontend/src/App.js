import "./App.css";
import React, { useState } from "react";

import PaperTrading from "./components/PaperTrading";

import Search_page from "./components/Search_page";

import Login from "./components/Login.js";
import Register from "./components/Register.js";
// import Feedback from "./components/Feedback.js";

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
        {/* <Feedback /> */}

        <PaperTrading/>
        {/* <Stock /> */}

        {/* <Login/> */}
        {/* <Clock /> */}
        {/* <Crypto /> */}
      </div>
    );
}

export default App;
