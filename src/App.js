import "./App.css";
import React from "react";
import Stock from "./Stock";
import Stock_FB from "./Stock_FB";
// import Coin from "./components/Coin.js";
// import Navbars from "./components/Navbars.js";
// import Crypto from "./components/Crypto.js";
// import Clock from "./components/Clock.js";
// import Login from "./components/Login.js";
//alpha vantage key
//THN5ITBH3LFSAWLV

function App() {
  return (
    <div className="App">
      <Stock></Stock>
      <Stock_FB></Stock_FB>
      {/* <Navbars /> */}
      {/* <Login/> */}
      {/* <Clock /> */}
      {/* <Crypto /> */}
    </div>
  );
}

export default App;
