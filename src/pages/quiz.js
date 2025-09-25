import React, { useEffect, useState } from "react";
import QuizCard from "../component/QuizCard";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz, listQuizzes } from "../feature/Quiz/quizSlice";
import CustomModal from "../component/CustomModal";
import QuizTable from "../component/QuizTable";
import Pagination from "../component/Pagination";

const Quiz = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const { quizzes, isLoading } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(listQuizzes());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const totalPages = Math.ceil(quizzes.length / itemsPerPage);
  const activeQuizzes = quizzes.filter((quiz) => quiz.status === 'Active').length;

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
      await dispatch(deleteQuiz(quizId)).unwrap();

      dispatch(listQuizzes());
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
          <QuizCard
            icon={"📚"}
            title="Total Quizzes"
            value={quizzes.length}
            growth="+8% this month"
          />
          <QuizCard
            icon={"✅"}
            title="Active Quizzes"
            value={activeQuizzes}
            growth="+8% this month"
          />
          <QuizCard
            icon={"📈"}
            title="Analytics"
            value="95%"
            growth="+8% this month"
          />
        </div>
        <div className="main-table-container">
          <div className="table-container">
            <div className="table-header">
              <h2>All Quizzes</h2>
            </div>

            {isLoading ? (
              <p>Loading quizzes...</p>
            ) : (
              <>
                <QuizTable
                  quizzes={quizzes}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onDelete={handleDeleteClick}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={setCurrentPage}
                />
              </>
            )}
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
