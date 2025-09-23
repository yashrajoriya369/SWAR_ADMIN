import React from "react";
import QuizCard from "../component/QuizCard";
import Table from "../component/Table";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

const Quiz = () => {
  return (
    <div>
      <Link to="create-quizzes" className="final-create-quiz-btn">
        <IoAddCircleOutline /> Create Quiz
      </Link>
      <div className="card-grid">
        <QuizCard title="Total Quizzes" icon="📚" />
        <QuizCard title="Active Quizzes" icon="✅" />
        <QuizCard title="Analytics" icon="📈" />
      </div>
      <Table />
    </div>
  );
};

export default Quiz;
