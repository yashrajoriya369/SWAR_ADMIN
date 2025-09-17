import React from "react";
import { Link, Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuUserRoundPen } from "react-icons/lu";
import { BsPersonVideo3 } from "react-icons/bs";
import { LuHistory } from "react-icons/lu";
import { AiOutlineTeam } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";

const MainLayout = () => {
  return (
    <div>
      <div className="sidebar">
        <div className="user-information">
          <img
            src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            alt="img"
          />
          <div>
            <h6>Yash Rajoriya</h6>
            <p>Student</p>
          </div>
        </div>
        <Link to="/admin">
          <i className="bi bi-speedometer2 me-2">
            <RxDashboard />
          </i>{" "}
          Dashboard
        </Link>
        <Link to="profile">
          <i className="bi bi-person me-2">
            <LuUserRoundPen />
          </i>{" "}
          Profile
        </Link>
        <Link to="interviews">
          <i className="bi bi-journal-text me-2">
            <BsPersonVideo3 />
          </i>{" "}
          My Interviews
        </Link>
        <Link to="history">
          <i className="bi bi-clock-history me-2">
            <LuHistory />
          </i>{" "}
          History
        </Link>
        <Link to="team">
          <i className="bi bi-people me-2">
            <AiOutlineTeam />
          </i>{" "}
          Our Team
        </Link>
        <Link to="/">
          <i className="bi bi-box-arrow-right me-2">
            <CiLogout />
          </i>{" "}
          Logout
        </Link>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
