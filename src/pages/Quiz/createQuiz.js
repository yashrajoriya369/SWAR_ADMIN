import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import QuizDetails from "./quizDetails";
import QuizQuestions from "./quizQuestions";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuiz,
  getQuizById,
  updateQuiz,
} from "../../feature/Quiz/quizSlice";
import { useNavigate, useParams } from "react-router-dom";

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
  status: Yup.string().oneOf(["Active", "Draft", "Archived"]),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        questionText: Yup.string().required("Question text is required"),
        questionType: Yup.string().oneOf(["Multiple Choice", "True/False"]),
        marks: Yup.number().min(1).required("Marks are required"),
        options: Yup.array().when("questionType", ([type], schema) => {
          type === "Multiple Choice" ? schema.min(2) : schema.length(2);
        }),

        correctAnswer: Yup.string().required("Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getQuizId } = useParams();
  const [step, setStep] = useState(1);

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
    status: "Draft",
    questions: [
      {
        questionText: "",
        questionType: "Multiple Choice",
        marks: 1,
        options: ["", "", "", ""],
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
    <div className="quiz-container">
      <Formik
        initialValues={fromInitialValues}
        enableReinitialize
        validationSchema={quizSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            {step === 1 ? (
              <QuizDetails {...formikProps} goToNext={() => setStep(2)} />
            ) : (
              <QuizQuestions {...formikProps} goBack={() => setStep(1)} />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuiz;
