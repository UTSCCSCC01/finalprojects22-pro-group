import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import StockFeed from "./StockFeed";

function Home() {
    return (
        <div className="home">
            <Sidebar />
            <StockFeed />
        </div>
    );
}

export default Home;
