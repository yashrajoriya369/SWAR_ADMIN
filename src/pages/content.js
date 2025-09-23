import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import QuizDetails from "./quizDetails";
import QuizQuestions from "./quizQuestions";
import { useDispatch } from "react-redux";
import { registerQuiz } from "../feature/Quiz/quizSlice"; // adjust path

const quizSchema = Yup.object().shape({
  quizName: Yup.string().required("Quiz name is required"),
  subjectId: Yup.string().required("Subject ID is required"),
  // Add more validation as needed
});

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const initialValues = {
    quizName: "",
    subjectId: "",
    attemptType: "Single",
    startTime: "",
    endTime: "",
    durationMintutes: 30,
    status: "Inactive",
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

  const handleSubmit = (values) => {
    dispatch(registerQuiz(values));
  };

  return (
    <div className="quiz-container">
      

      <Formik
        initialValues={initialValues}
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
