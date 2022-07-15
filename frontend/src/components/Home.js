import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import StockFeed from "./StockFeed";
import WatchList from "./WatchList";
function Home() {
    return (
        <div className="home">
            <Sidebar />
            <StockFeed className="Stocks" />
            <WatchList className="WatchList"/>
        </div>
    );
}

export default Home;
