import React, { useState } from "react";
import QuizCard from "../component/QuizCard";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Quiz = () => {
  const quizState = useSelector((state) => state.quiz.quizzes)
  // console.log(quizState)

  const [quizzes] = useState([
    {
      name: "React Basics",
      category: "React",
      difficulty: "Easy",
      status: "online",
      date: "01/09/2025",
      time: "00:00",
    },
    {
      name: "JavaScript Fundamentals",
      category: "JavaScript",
      difficulty: "Medium",
      status: "offline",
      date: "10/09/2025",
      time: "00:00",
    },
    {
      name: "DSA Practice",
      category: "DSA",
      difficulty: "Hard",
      status: "online",
      date: "15/09/2025",
      time: "00:00",
      marks: "0",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = quizzes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(quizzes.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
      <div className="main-table-container">
        <div className="table-container">
          <div className="table-header">
            <h2>All Quizzes</h2>
          </div>

          <table className="quiz-table">
            <thead>
              <tr>
                <th>SubjectId</th>
                <th>Subject Name</th>
                <th>Attempt Type</th>
                <th>Status</th>
                <th>Available From</th>
                <th>Available To</th>
                <th>Marks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((quiz, index) => (
                <tr key={index}>
                  <td>{quiz.name}</td>
                  <td>{quiz.category}</td>
                  <td>{quiz.difficulty}</td>
                  <td>
                    <span className={`status ${quiz.status}`}>
                      {quiz.status.toUpperCase()}
                    </span>
                  </td>
                  <td>{quiz.date}</td>
                  <td>{quiz.time}</td>
                  <td>{quiz.marks}</td>
                  <td>
                    <button className="action-btn">Update</button>
                    <button className="action-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo; Previous
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`pagination-btn ${
                  currentPage === number ? "active" : ""
                }`}
              >
                {number}
              </button>
            ))}

            <button
              className="pagination-btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
