import React from "react";
import { MdOutlineStackedLineChart } from "react-icons/md";

const Card = () => {
  return (
    <div className="card">
      <div className="card-div-icon">
        <MdOutlineStackedLineChart className="card-icon" />
      </div>
      <div className="card-content">
        <h3 className="card-title">Today User's</h3>
        <p className="value">0000</p>
      </div>
      <span className="growth">+55% than last week</span>
    </div>
  );
};

export default Card;
