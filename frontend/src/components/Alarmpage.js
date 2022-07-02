import React, { Fragment } from "react";
//import "fdweb/normalize.css";
//import "fdweb/fluent.css";
//import "fdweb/fluent-icons.css";
import "./Alarmpage.css";
import Alarm from "./AlarmComp";
import Sidebar from "./Sidebar";

const Alarmpage = () => {
    return (
        <div className="alarmpage">
            <Sidebar />

            <div className="alarm">
                <div className="alarmHeader">
                    <h2> Alarm</h2>
                </div>
                <Alarm />
            </div>
        </div>
    );
};

export default Alarmpage;