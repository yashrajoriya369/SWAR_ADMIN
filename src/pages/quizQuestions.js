import React from "react";
import { FieldArray } from "formik";
import { RxCross1 } from "react-icons/rx";
import { hover } from "@testing-library/user-event/dist/hover";

const QuizQuestions = ({ values, handleChange, goBack }) => {
  return (
    <>
      <h2
        className="quiz-title"
        style={{
          position: "fixed",
          top: "15px",
          width: "73.5%",
          padding: "15px",
          zIndex: "1",
        }}
      >
        Create a Questions
      </h2>
      <FieldArray name="questions">
        {(arrayHelpers) => (
          <div
            className="quiz-data-container mt-5"
            style={{
              maxHeight: "75vh",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            {values.questions.map((q, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #CCC",
                  width: "99.5%",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "20px",
                  backgroundColor: "#F9F9F9",
                }}
              >
                {values.questions.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4>Question {index + 1}</h4>
                    <RxCross1
                      onClick={() => arrayHelpers.remove(index)}
                      style={{
                        fontSize: "2rem",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                )}

                <div className="question-data">
                  <label>Question Text:</label>
                  <input
                    type="text"
                    name={`questions[${index}].questionText`}
                    value={q.questionText}
                    onChange={handleChange}
                  />
                </div>

                <div className="question-data">
                  <label>Question Type:</label>
                  <select
                    name={`questions[${index}].questionType`}
                    value={q.questionType}
                    onChange={handleChange}
                  >
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True/False">True/False</option>
                  </select>
                </div>

                <div className="question-data">
                  <label>Marks:</label>
                  <input
                    type="number"
                    name={`questions[${index}].marks`}
                    value={q.marks}
                    onChange={handleChange}
                  />
                </div>

                <div className="question-data">
                  <label>Options:</label>

                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} style={{ marginTop: "5px" }}>
                      <input
                        type="text"
                        name={`questions[${index}].options[${oIndex}]`}
                        value={opt}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>

                <div className="question-data">
                  <label>Correct Answer:</label>
                  <select
                    name={`questions[${index}].correctAnswer`}
                    value={q.correctAnswer}
                    onChange={handleChange}
                  >
                    <option value="">-- Select --</option>
                    {q.options.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            <div className="add-questions-page-btn">
              <button
                type="button"
                onClick={() =>
                  arrayHelpers.push({
                    questionText: "",
                    questionType: "Multiple Choice",
                    marks: 1,
                    options: ["", "", "", ""],
                    correctAnswer: "",
                  })
                }
                className="add-questions-btn"
              >
                + Add Question
              </button>
            </div>
          </div>
        )}
      </FieldArray>

      <div className="add-questions-page-submit-btn">
        <button type="button" onClick={goBack}>
          ← Back
        </button>
        <button type="submit" style={{ marginLeft: "20px" }}>
          Submit Quiz
        </button>
      </div>
    </>
  );
};

export default QuizQuestions;
