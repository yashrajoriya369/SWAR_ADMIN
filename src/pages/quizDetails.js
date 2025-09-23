import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const QuizDetails = ({ values, handleChange, touched, errors, goToNext }) => {
  return (
    <>
      <h2 className="quiz-title">Create a Quiz</h2>
      <div className="quiz-data-container quiz-data">
        <label>Quiz Name:</label>
        <input
          type="text"
          name="quizName"
          placeholder="Enter Quiz Name"
          value={values.quizName}
          onChange={handleChange}
        />
        {touched.quizName && errors.quizName && (
          <div style={{ color: "red" }}>{errors.quizName}</div>
        )}
      </div>

      <div className="quiz-data">
        <label>Subject ID:</label>
        <input
          type="text"
          placeholder="Enter Quiz ID"
          name="subjectId"
          value={values.subjectId}
          onChange={handleChange}
        />
        {touched.subjectId && errors.subjectId && (
          <div style={{ color: "red" }}>{errors.subjectId}</div>
        )}
      </div>

      <div className="quiz-data">
        <label>Attempt Type:</label>
        <select
          name="attemptType"
          value={values.attemptType}
          onChange={handleChange}
        >
          <option value="Single">Single</option>
          <option value="Multiple">Multiple</option>
        </select>
      </div>

      <div className="quiz-data">
        <label>Start Time:</label>
        <input
          type="datetime-local"
          name="startTime"
          value={values.startTime}
          onChange={handleChange}
        />
      </div>

      <div className="quiz-data">
        <label>End Time:</label>
        <input
          type="datetime-local"
          name="endTime"
          value={values.endTime}
          onChange={handleChange}
        />
      </div>

      <div className="quiz-data">
        <label>Duration (minutes):</label>
        <input
          type="number"
          name="durationMintutes"
          value={values.durationMintutes}
          onChange={handleChange}
        />
      </div>

      <div className="quiz-data">
        <label>Status:</label>
        <select name="status" value={values.status} onChange={handleChange}>
          <option value="Inactive">Inactive</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="quiz-add-questions-btn">
        <button type="button" className="add-question-btn" onClick={goToNext}>
          Add Questions <FaLongArrowAltRight style={{ marginLeft: "8px" }} />
        </button>
      </div>
    </>
  );
};

export default QuizDetails;
