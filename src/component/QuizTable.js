import React, { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const QuizTable = ({ quizzes, currentPage, itemsPerPage, onDelete }) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = useMemo(() => {
    return quizzes.slice(indexOfFirstItem, indexOfLastItem);
  }, [quizzes, indexOfFirstItem, indexOfLastItem]);

  const handleDelete = useCallback((id) => onDelete(id), [onDelete]);

  return (
    <table className="quiz-table">
      <thead>
        <tr>
          <th>SubjectId</th>
          <th>Quiz Name</th>
          <th>Attempt Type</th>
          <th>Status</th>
          <th>Available From</th>
          <th>Available To</th>
          <th>Duration</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((quiz) => (
          <tr key={quiz._id}>
            <td>{quiz.subjectId}</td>
            <td>{quiz.quizName}</td>
            <td>{quiz.attemptType}</td>
            <td>
              <span className={`status ${quiz.status.toLowerCase()}`}>
                {quiz.status}
              </span>
            </td>
            <td>{new Date(quiz.startTime).toLocaleString()}</td>
            <td>{new Date(quiz.endTime).toLocaleString()}</td>
            <td>{quiz.durationMinutes}</td>
            <td>
              <Link to={`update-quizzes/${quiz._id}`}>
                <CiEdit className="action-btn edit-icon" />
              </Link>
              <button
                onClick={() => handleDelete(quiz._id)}
                className="action-btn delete-btn"
              >
                <AiOutlineDelete className="action-btn delete-icon" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuizTable;
