import React, { useState, useEffect } from "react";
import "./Community.css";
import Sidebar from "./Sidebar";
import GroupList from "./GroupList";
import "./Community.css";

function Community() {
    return (
        <div className="community">
            <Sidebar />
            <GroupList listtype="My Groups" />
            <GroupList listtype="Searching" />
        </div>
    );
}

export default Community;
