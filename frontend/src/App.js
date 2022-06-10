import "./App.css";
import React, { useState } from "react";
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
    const [StockSymbol, setStockSymbol] = useState("FB");
  return (
    <div className="App">
      <script
        src="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/js/mdui.min.js"
        integrity="sha384-gCMZcshYKOGRX9r6wbDrvF+TcCCswSHFucUzUPwka+Gr+uHgjlYvkABr95TCOz3A"
        crossorigin="anonymous"
      ></script>
      <link rel="stylesheet" href="https://cdn.w3cbus.com/library/mdui/1.0.2/css/mdui.min.css"/>


      <div class="mdui-appbar">
        <div class="mdui-toolbar mdui-color-indigo">
          <a href="javascript:" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">menu</i></a>
          <a href="javascript:" class="mdui-typo-headline">MDUI</a>
          <a href="javascript:" class="mdui-typo-title">Title</a>
          <div class="mdui-toolbar-spacer"></div>
          <a href="javascript:" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">search</i></a>
          <a href="javascript:" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">refresh</i></a>
          <a href="javascript:" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">more_vert</i></a>
        </div>
      </div>



      <div className="Center">
        <Stock></Stock>
        <Stock_FB></Stock_FB>
      </div>
      {/* <Navbars /> */}
      {/* <Login/> */}
      {/* <Clock /> */}
      {/* <Crypto /> */}
    </div>
  );
}

export default App;
