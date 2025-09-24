import React from "react";

const QuizCard = (props) => {
  return (
    <div className="quiz-card">
      <div className="quiz-card-div-icon">
        <div className="quiz-icon">{props.icon}</div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{props.title}</h3>
        <p className="value">00</p>
        <span className="growth">+55% than last week</span>
      </div>
    </div>
  );
};

export default QuizCard;
