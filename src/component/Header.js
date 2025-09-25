import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div>
      <header className="dashboard-header  header">
        <div>
          <div className="breadcrum-header">
            <Link to="/admin" className="breadcrum-home-link">
              <GoHome className="breadcrum-home-icon" />
            </Link>

            <span>/</span>
            <span className="title">{props.title}</span>
          </div>
          <p className="main-title">{props.title}</p>
        </div>
        <div className="input-field">
          <input type="text" placeholder="Search here..." id="search-box" />
          <CgProfile className="header-icon" />
          <IoSettingsOutline className="header-icon" />
          <FaRegBell className="header-icon" />
        </div>
      </header>
      <hr className="fading-line" />
    </div>
  );
};

export default Header;
