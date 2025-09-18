import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import Card from "../component/Card";
import Header from "../component/Header";

const Dashboard = () => {
  return (
    <div>
      <Header title="Dashboard" />
      <div className="card-section">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="graph-section"></div>
    </div>
  );
};

export default Dashboard;
