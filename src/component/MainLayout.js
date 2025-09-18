import React, { useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdContentPaste } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuTableOfContents } from "react-icons/lu";
import { TbReportSearch } from "react-icons/tb";
import { RiLogoutCircleLine } from "react-icons/ri";

const MainLayout = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="main-container">
      <div className="main-container-1">
        <div className="logo-info">
          <span>
            <MdOutlineAdminPanelSettings className="logo-icon" />
          </span>
          Admin
        </div>
        <hr className="fading-line" />
        <ul className="root-list">
          <Link
            className={`nav-btn ${active === "dashboard" ? "active" : ""}`}
            onClick={() => setActive("dashboard")}
          >
            <LuLayoutDashboard className="icon" />
            Dashboard
          </Link>
          <Link
            className={`nav-btn ${active === "profile" ? "active" : ""} `}
            onClick={() => setActive("profile")}
          >
            <CgProfile className="icon" />
            Profile
          </Link>
          <Link
            className={`nav-btn ${active === "manage-users" ? "active" : ""}`}
            onClick={() => setActive("manage-users")}
          >
            <MdContentPaste className="icon" />
            Manage Users
          </Link>
          <Link
            className={`nav-btn ${active === "manage-content" ? "active" : ""}`}
            onClick={() => setActive("manage-content")}
          >
            <LuTableOfContents className="icon" />
            Manage Content
          </Link>
          <Link
            className={`nav-btn ${active === "reports" ? "active" : ""} `}
            onClick={() => setActive("reports")}
          >
            <TbReportSearch className="icon" />
            Reports
          </Link>
          <Link className="nav-btn logout-btn">
            <RiLogoutCircleLine className="icon" />
            Logout
          </Link>
        </ul>
      </div>
      <div className="main-container-2">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
