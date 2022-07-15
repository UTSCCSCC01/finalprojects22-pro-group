import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SidebarOpt from "./SidebarOpt";
import PeopleIcon from "@mui/icons-material/People";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SearchIcon from "@mui/icons-material/Search";
import AlarmIcon from "@mui/icons-material/Alarm";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo"> Proview</div>
            <br />
            <SidebarOpt Icon={HomeIcon} text="Home" />
            <SidebarOpt Icon={PersonIcon} text="Profile" />
            <SidebarOpt Icon={LocalFireDepartmentIcon} text="HotList" />
            <SidebarOpt Icon={SearchIcon} text="Search" />
            <SidebarOpt Icon={AlarmIcon} text="Alarm" />
            <SidebarOpt Icon={PeopleIcon} text="Friends" />
            <SidebarOpt Icon={LogoutIcon} text="Logout" />
            <SidebarOpt Icon={PeopleIcon} text="Chat" />
            <SidebarOpt Icon={PeopleIcon} text="Group" />
        </div>
    );
}

export default Sidebar;
