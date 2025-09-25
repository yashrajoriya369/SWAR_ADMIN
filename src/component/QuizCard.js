import React from "react";

const QuizCard = React.memo(({ icon, title, value, growth }) => {
  return (
    <div className="quiz-card">
      <div className="quiz-card-div-icon">
        <div className="quiz-icon">{icon}</div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="value">{value}</p>
        {growth && <span className="growth">{growth}</span>}
      </div>
    </div>
  );
});

export default QuizCard;
