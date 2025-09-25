import React, { useEffect, useState } from "react";
import QuizCard from "../component/QuizCard";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuizzes, deleteQuizzes } from "../feature/Quiz/quizSlice";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import CustomModal from "../component/CustomModal";

const Quiz = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const { quizzes, isLoading } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(getAllQuizzes());
  }, [dispatch]);

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

  const handleDeleteClick = (quizId) => {
    setShowModal(true);
    setQuizId(quizId);
  };

  const handleDeleteConfrim = async () => {
    if (!quizId) return;
    try {
      await dispatch(deleteQuizzes(quizId)).unwrap();

      dispatch(getAllQuizzes());
      setShowModal(false);
      setQuizId(null);
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  return (
    <>
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

            {isLoading ? (
              <p>Loading quizzes...</p>
            ) : (
              <table className="quiz-table">
                <thead>
                  <tr>
                    <th>SubjectId</th>
                    <th>Subject Name</th>
                    <th>Attempt Type</th>
                    <th>Status</th>
                    <th>Available From</th>
                    <th>Available To</th>
                    <th>Duration</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((quiz, index) => (
                    <tr key={quiz._id || index}>
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
                        <Link to={`create-quizzes/${quiz._id}`}>
                          <CiEdit
                            className="action-btn"
                            style={{
                              marginRight: "15px",
                              color: "blue",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(quiz._id)}
                          style={{ border: "none", background: "none" }}
                        >
                          <AiOutlineDelete
                            className="action-btn"
                            style={{
                              color: "red",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
      <CustomModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setQuizId(null);
        }}
        onConfirm={handleDeleteConfrim}
      />
    </>
  );
};

export default Quiz;
