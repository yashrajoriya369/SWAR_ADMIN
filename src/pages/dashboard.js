import React from "react";
import Card from "../component/Card";
import Header from "../component/Header";
import { MdOutlineStackedLineChart } from "react-icons/md";

const Dashboard = () => {
  return (
    <div>
      <Header title="Dashboard" />
      <div className="card-section">
        <Card
          icon={MdOutlineStackedLineChart}
          title="Today's Users"
          value="1234"
          growth="+12% this week"
        />
        <Card
          icon={MdOutlineStackedLineChart}
          title="Today's Users"
          value="1234"
          growth="+12% this week"
        />
        <Card
          icon={MdOutlineStackedLineChart}
          title="Today's Users"
          value="1234"
          growth="+12% this week"
        />
      </div>
      <div className="graph-section"></div>
    </div>
  );
};

export default Dashboard;
