import "./App.css";
import React, { useState } from "react";
import Stock from "./components/Stock";
import Stock_FB from "./components/Stock_FB";
// import Coin from "./components/Coin.js";
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
      <Stock></Stock>
      {/* <Stock_FB></Stock_FB> */}
      {/* <Navbars /> */}
      {/* <Login/> */}
      {/* <Clock /> */}
      {/* <Crypto /> */}
    </div>
  );
}

export default App;
