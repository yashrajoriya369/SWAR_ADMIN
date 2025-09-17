import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h4 className="mb-3">My Interviews</h4>
      <div className="row g-3">
        <div className="cards col-md-4">
          <div className="card-custom card-gray">
            <h5>Essay</h5>
            <p>00 lessons</p>
            <span>0.0%</span>
          </div>
        </div>
        <div className="cards col-md-4">
          <div className="card-custom card-green">
            <h5>Speaking</h5>
            <p>00 lessons</p>
            <span>0.0%</span>
          </div>
        </div>
        <div className="cards col-md-4">
          <div className="card-custom card-yellow">
            <h5>Jumble Parawords</h5>
            <p>00 lessons</p>
            <span>0.0%</span>
          </div>
        </div>
        <div className="cards col-md-4">
          <div className="card-custom card-orange">
            <h5>Quiz</h5>
            <p>00 lessons</p>
            <span>0.0%</span>
          </div>
        </div>
        <div className="cards col-md-4">
          <div className="card-custom card-blue">
            <h5>Reading</h5>
            <p>00 lessons</p>
            <span>0.0%</span>
          </div>
        </div>
        <div className="cards col-md-4">
          <div className="card-custom card-pink">
            <h5>Essay</h5>
            <p>00 lessons</p>
            <span>0.0%</span>
          </div>
        </div>
      </div>

      <div className="row mt-4 g-3">
        <div className="col-md-4">
          <div className="stats-card text-center">
            <h5>Statistics</h5>
            <p>✅ Completed: 0</p>
            <p>📈 In Progress: 0</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats-card text-center">
            <h5>Leaderboard</h5>
            <p>#0000</p>
            <button className="btn btn-sm btn-primary">View Rank</button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats-card text-center">
            <h5>Activity</h5>
            <p>DAY | WEEK | MONTH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
