import React from "react";
import "./StockList.css";
import Sidebar from "./Sidebar";
import StockListComponent from "./StockListComponent";

function StorkList() {
    return (
        <div className="hotlist_container">
            <Sidebar />
            <StockListComponent className="StockList" />
        </div>
    );
}

export default StorkList;
