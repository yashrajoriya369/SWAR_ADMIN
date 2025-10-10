import React from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdContentPaste } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuTableOfContents } from "react-icons/lu";
import { TbReportSearch } from "react-icons/tb";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logoutUser } from "../feature/auth/userSlice";
import { useDispatch } from "react-redux";

const menuItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: <LuLayoutDashboard className="icon" />,
  },
  {
    to: "profile",
    label: "Profile",
    icon: <CgProfile className="icon" />,
  },
  {
    to: "manage-users",
    label: "Manage Users",
    icon: <MdContentPaste className="icon" />,
  },
  {
    to: "manage-content",
    label: "Manage Content",
    icon: <LuTableOfContents className="icon" />,
  },
  {
    to: "reports",
    label: "Reports",
    icon: <TbReportSearch className="icon" />,
  },
];

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
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
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `nav-btn ${isActive ? "active" : ""}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
          <button className="nav-btn logout-btn" onClick={handleLogout}>
            <RiLogoutCircleLine className="icon" />
            Logout
          </button>
        </ul>
      </div>
      <div className="main-container-2">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
