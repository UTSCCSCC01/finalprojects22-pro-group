import React from "react";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SidebarOpt from "./SidebarOpt";
import PeopleIcon from "@mui/icons-material/People";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <CandlestickChartIcon className="sidebarIcon" />
            <SidebarOpt Icon={HomeIcon} text="Home" />
            <SidebarOpt Icon={PersonIcon} text="Profile" />
            <SidebarOpt Icon={LogoutIcon} text="Logout" />
            <SidebarOpt Icon={ExitToAppIcon} text="BackToLogin" />
            <SidebarOpt Icon={PeopleIcon} text="Friends" />
            <SidebarOpt Icon={LocalFireDepartmentIcon} text="HotList" />
            <SidebarOpt Icon={PersonSearchIcon} text="Search" />
        </div>
    );
}

export default Sidebar;
