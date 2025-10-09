import React, { useEffect, useRef } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LuGripHorizontal } from "react-icons/lu";
import { IoCopyOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import Select from "react-select";
import {
  createQuiz,
  getQuizById,
  updateQuiz,
} from "../../feature/Quiz/quizSlice";
import { useNavigate, useParams } from "react-router-dom";
import { IoDocumentText } from "react-icons/io5";
import "./QuizForm.css";

const quizSchema = Yup.object().shape({
  quizName: Yup.string().required("Quiz name is required"),
  subjectId: Yup.string().required("Subject ID is required"),
  attemptType: Yup.string().oneOf(["Single", "Multiple"]),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string()
    .required("End time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { startTime } = this.parent;
        return new Date(value) > new Date(startTime);
      }
    ),
  durationMinutes: Yup.number()
    .required("Duration is required")
    .min(1, "Duration must be at least 1 minute"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        questionText: Yup.string().required("Question text is required"),
        questionType: Yup.string().oneOf(["Multiple Choice", "Checkbox"]),
        marks: Yup.number().min(1).required("Marks are required"),
        options: Yup.array().min(2, "At least two options required"),
        correctAnswer: Yup.lazy((value, { parent }) => {
          if (parent.questionType === "Checkbox") {
            return Yup.array()
              .of(Yup.string())
              .min(1, "Select at least one correct answer");
          }
          return Yup.string().required("Correct answer is required");
        }),
      })
    )
    .min(1, "At least one question is required"),
});

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formikRef = useRef(null);
  const { getQuizId } = useParams();
  const { selectedQuiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (getQuizId) {
      dispatch(getQuizById(getQuizId));
    }
  }, [dispatch, getQuizId]);

  const initialValues = {
    quizName: "",
    subjectId: "",
    attemptType: "Single",
    startTime: "",
    endTime: "",
    durationMinutes: 1,
    questions: [
      {
        questionText: "",
        questionType: "Multiple Choice",
        marks: 1,
        options: [""],
        correctAnswer: "",
      },
    ],
  };

  function formatDateTimeLocal(dateString) {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().slice(0, 16);
  }
  const fromInitialValues =
    selectedQuiz && getQuizId
      ? {
          ...selectedQuiz,
          startTime: formatDateTimeLocal(selectedQuiz.startTime),
          endTime: formatDateTimeLocal(selectedQuiz.endTime),
        }
      : initialValues;

  const handleSubmit = async (values) => {
    const formatedValues = {
      ...values,
      startTime: new Date(values.startTime).toISOString(),
      endTime: new Date(values.endTime).toISOString(),
    };
    try {
      if (getQuizId) {
        await dispatch(
          updateQuiz({ quizId: getQuizId, quizData: formatedValues })
        ).unwrap();
        navigate("/admin/manage-content/manage-quizzes/");
      } else {
        await dispatch(createQuiz(formatedValues)).unwrap();

        navigate("/admin/manage-content/manage-quizzes/");
      }
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
  };

  return (
    <>
      <div className="quiz-form-container">
        {/* Header */}
        <header className="header">
          <div className="header-container">
            <div className="header-up">
              <div className="header-left">
                <IoDocumentText className="form-icon" />
                <input
                  type="text"
                  placeholder="Untitled document"
                  aria-label="Document title"
                  className="title-input"
                  autoComplete="off"
                />
              </div>
              <div className="header-right">
                <button
                  type="submit"
                  className="publish-btn"
                  onClick={() => formikRef.current?.handleSubmit()}
                >
                  Publish
                </button>
                <img
                  src="https://placehold.co/40x40/E2E8F0/4A5568?text=A"
                  alt="User Avatar"
                  className="user-avatar"
                />
              </div>
            </div>
            <div className="header-down">
              <div className="header-center">
                <button className="header-tab active">Questions</button>
                <button className="header-tab">Responses</button>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="main-content">
          <div className="form-layout">
            <div className="form-body">
              {/* Form Title Card */}
              <Formik
                innerRef={formikRef}
                initialValues={fromInitialValues}
                enableReinitialize
                validationSchema={quizSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange, setFieldValue }) => (
                  <Form>
                    <div className="form-title-card">
                      <div className="form-body-content">
                        <div className="form-quiz-info">
                          <input
                            type="text"
                            name="quizName"
                            placeholder="Quiz Name"
                            className="form-quiz-input"
                            value={values.quizName || ""}
                            onChange={handleChange}
                          />

                          <input
                            type="text"
                            placeholder="Quiz ID"
                            name="subjectId"
                            className="form-quiz-input"
                            value={values.subjectId || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-quiz-time">
                          <input
                            type="datetime-local"
                            name="startTime"
                            className="form-quiz-input"
                            value={values.startTime || ""}
                            onChange={handleChange}
                          />
                          <input
                            type="datetime-local"
                            name="endTime"
                            className="form-quiz-input"
                            value={values.endTime || ""}
                            onChange={handleChange}
                          />
                          <input
                            type="number"
                            name="durationMinutes"
                            placeholder="Duration (in mins)"
                            className="form-quiz-input"
                            value={values.durationMinutes || ""}
                            onChange={handleChange}
                            min={1}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Questions Card */}
                    <FieldArray name="questions">
                      {(arrayHelpers) => (
                        <div className="">
                          {values.questions.map((q, index) => (
                            <div key={index} className="question-card">
                              {values.questions.length > 1 && (
                                <div className="question-card-content">
                                  <div className="drag-handle">
                                    <LuGripHorizontal className="svg" />
                                  </div>
                                  <div>
                                    <h4>Question {index + 1}</h4>
                                  </div>
                                </div>
                              )}

                              <div className="question-card-content ">
                                <div className="question-top">
                                  <input
                                    type="text"
                                    name={`questions[${index}].questionText`}
                                    value={q.questionText || ""}
                                    onChange={handleChange}
                                    className="question-input"
                                    placeholder="Question"
                                  />

                                  <select
                                    name={`questions[${index}].questionType`}
                                    value={q.questionType || "Multiple Choice"}
                                    onChange={handleChange}
                                    className="question-type-selector"
                                  >
                                    <option value="Multiple Choice">
                                      Multiple Choice
                                    </option>
                                    <option value="Checkbox">Checkbox</option>
                                  </select>
                                </div>

                                {/* Options FieldArray */}
                                <FieldArray
                                  name={`questions[${index}].options`}
                                >
                                  {(optionHelpers) => (
                                    <div className="options-section">
                                      {values.questions[index].options.map(
                                        (opt, oIndex) => (
                                          <div
                                            key={oIndex}
                                            className="option-item"
                                          >
                                            <input
                                              type={
                                                values.questions[index]
                                                  .questionType === "Checkbox"
                                                  ? "checkbox"
                                                  : "radio"
                                              }
                                              name={`options-${index}`}
                                              className="option-radio"
                                              disabled
                                            />
                                            <input
                                              type="text"
                                              name={`questions[${index}].options[${oIndex}]`}
                                              value={opt}
                                              onChange={handleChange}
                                              placeholder={`Option ${
                                                oIndex + 1
                                              }`}
                                              className="option-input"
                                            />

                                            {values.questions[index].options
                                              .length > 1 && (
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  optionHelpers.remove(oIndex)
                                                }
                                                className="delete-option-btn"
                                              >
                                                <XIcon />
                                              </button>
                                            )}
                                          </div>
                                        )
                                      )}

                                      <div className="option-item add-option-row">
                                        <input
                                          type={
                                            values.questions[index]
                                              .questionType === "Checkbox"
                                              ? "checkbox"
                                              : "radio"
                                          }
                                          className="option-radio"
                                          disabled
                                        />
                                        <button
                                          type="button"
                                          onClick={() => optionHelpers.push("")}
                                          className="add-option-btn"
                                        >
                                          + Add option
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </FieldArray>
                                <hr style={{ color: "gray" }} />

                                <div className="toolbar-container">
                                  {q.questionType === "Checkbox" ? (
                                    <Select
                                      isMulti
                                      name={`questions[${index}].correctAnswer`}
                                      options={q.options.map((opt) => ({
                                        label: opt,
                                        value: opt,
                                      }))}
                                      value={(q.correctAnswer || []).map(
                                        (ans) => ({ label: ans, value: ans })
                                      )}
                                      onChange={(selectedOptions) => {
                                        const values = selectedOptions
                                          ? selectedOptions.map((s) => s.value)
                                          : [];
                                        setFieldValue(
                                          `questions[${index}].correctAnswer`,
                                          values
                                        );
                                      }}
                                      className="react-select-container"
                                      classNamePrefix="react-select"
                                      placeholder="-- Select Answer --"
                                    />
                                  ) : (
                                    <select
                                      name={`questions[${index}].correctAnswer`}
                                      value={q.correctAnswer || ""}
                                      onChange={handleChange}
                                      className="question-type-selector"
                                    >
                                      <option value="">
                                        -- Select Answer --
                                      </option>
                                      {q.options.map((opt, idx) => (
                                        <option key={idx} value={opt}>
                                          {opt}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                  <div className="right-toolbar">
                                    <div className="quiz-tooltip">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.push({
                                            questionText: "",
                                            questionType: "Multiple Choice",
                                            marks: 1,
                                            options: [""],
                                            correctAnswer: "",
                                          })
                                        }
                                        className="add-quiz-toolbar-btn"
                                      >
                                        <IoAddCircleOutline />
                                      </button>
                                      <span className="tooltip-text">
                                        Add Question
                                      </span>
                                    </div>
                                    <div className="quiz-tooltip">
                                      <button
                                        className="copy-quiz-toolbar-btn"
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.insert(index + 1, {
                                            ...values.questions[index],
                                          })
                                        }
                                      >
                                        <IoCopyOutline />
                                      </button>
                                      <span className="tooltip-text">
                                        Copy Question
                                      </span>
                                    </div>
                                    {values.questions.length > 1 && (
                                      <div className="quiz-tooltip">
                                        <button
                                          type="button"
                                          className="delete-quiz-toolbar-btn"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <AiOutlineDelete />
                                        </button>
                                        <span className="tooltip-text">
                                          Delete Question
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </FieldArray>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateQuiz;
