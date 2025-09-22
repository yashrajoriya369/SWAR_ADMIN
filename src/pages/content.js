// import React from "react";
// import { Formik, FieldArray, Form } from "formik";
// import * as yup from "yup";
// import { useDispatch } from "react-redux";
// import { registerQuiz } from "../feature/Quiz/quizSlice";

// const quizSchema = yup.object({
//   title: yup
//     .string()
//     .min(3, "Title must be at least 3 characters")
//     .required("Quiz title is required"),
//   description: yup
//     .string()
//     .max(200, "Description must be less than 200 characters"),
//   questions: yup
//     .array()
//     .of(
//       yup.object({
//         question: yup.string().required("Question is required"),
//         options: yup
//           .array()
//           .of(yup.string().required("Option cannot be empty"))
//           .min(2, "At least 2 options are required"),
//         correctAnswer: yup.string().required("Correct answer is required"),
//       })
//     )
//     .min(1, "At least one question is required"),
// });

// const CreateQuiz = () => {
//   const dispatch = useDispatch();
//   return (
//     <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
//       <h2>Create a Quiz</h2>

//       <Formik
//         initialValues={{
//           title: "",
//           description: "",
//           questions: [
//             { question: "", options: ["", "", "", ""], correctAnswer: "" },
//           ],
//         }}
//         validationSchema={quizSchema}
//         onSubmit={(values) => {
//           dispatch(registerQuiz(values));
//         }}
//       >
//         {({ values, handleChange, handleBlur, touched, errors }) => (
//           <Form>
//             {/* Quiz Title */}
//             <div style={{ marginBottom: "15px" }}>
//               <label>Quiz Title:</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={values.title}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 style={{ width: "100%", padding: "8px" }}
//               />
//               {touched.title && errors.title && (
//                 <div style={{ color: "red" }}>{errors.title}</div>
//               )}
//             </div>

//             {/* Description */}
//             <div style={{ marginBottom: "15px" }}>
//               <label>Description:</label>
//               <textarea
//                 name="description"
//                 value={values.description}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 style={{ width: "100%", padding: "8px" }}
//               />
//               {touched.description && errors.description && (
//                 <div style={{ color: "red" }}>{errors.description}</div>
//               )}
//             </div>

//             {/* Questions */}
//             <FieldArray name="questions">
//               {(arrayHelpers) => (
//                 <div>
//                   {values.questions.map((q, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         border: "1px solid #ccc",
//                         padding: "15px",
//                         marginBottom: "15px",
//                         position: "relative",
//                       }}
//                     >
//                       {/* Delete Question */}
//                       {values.questions.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => arrayHelpers.remove(index)}
//                           style={{
//                             position: "absolute",
//                             top: "10px",
//                             right: "10px",
//                             background: "red",
//                             color: "white",
//                             border: "none",
//                             padding: "5px 10px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Delete
//                         </button>
//                       )}

//                       {/* Question Text */}
//                       <div>
//                         <label>Question {index + 1}:</label>
//                         <input
//                           type="text"
//                           name={`questions[${index}].question`}
//                           value={q.question}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           style={{
//                             width: "100%",
//                             padding: "8px",
//                             marginBottom: "10px",
//                           }}
//                         />
//                         {touched.questions?.[index]?.question &&
//                           errors.questions?.[index]?.question && (
//                             <div style={{ color: "red" }}>
//                               {errors.questions[index].question}
//                             </div>
//                           )}
//                       </div>

//                       {/* Options */}
//                       {q.options.map((opt, oIndex) => (
//                         <div key={oIndex} style={{ marginBottom: "5px" }}>
//                           <label>Option {oIndex + 1}:</label>
//                           <input
//                             type="text"
//                             name={`questions[${index}].options[${oIndex}]`}
//                             value={opt}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             style={{
//                               width: "90%",
//                               padding: "6px",
//                               marginLeft: "5px",
//                             }}
//                           />
//                           {touched.questions?.[index]?.options?.[oIndex] &&
//                             errors.questions?.[index]?.options?.[oIndex] && (
//                               <div style={{ color: "red" }}>
//                                 {errors.questions[index].options[oIndex]}
//                               </div>
//                             )}
//                         </div>
//                       ))}

//                       {/* Correct Answer */}
//                       <div style={{ marginTop: "10px" }}>
//                         <label>Correct Answer:</label>
//                         <select
//                           name={`questions[${index}].correctAnswer`}
//                           value={q.correctAnswer}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           style={{
//                             width: "100%",
//                             padding: "6px",
//                             marginTop: "5px",
//                           }}
//                         >
//                           <option value="">-- Select Correct Answer --</option>
//                           {q.options
//                             .filter((opt) => opt.trim() !== "")
//                             .map((opt, idx) => (
//                               <option key={idx} value={opt}>
//                                 {opt}
//                               </option>
//                             ))}
//                         </select>
//                         {touched.questions?.[index]?.correctAnswer &&
//                           errors.questions?.[index]?.correctAnswer && (
//                             <div style={{ color: "red" }}>
//                               {errors.questions[index].correctAnswer}
//                             </div>
//                           )}
//                       </div>
//                     </div>
//                   ))}

//                   {/* Add Question */}
//                   <button
//                     type="button"
//                     onClick={() =>
//                       arrayHelpers.push({
//                         question: "",
//                         options: ["", "", "", ""],
//                         correctAnswer: "",
//                       })
//                     }
//                     style={{
//                       padding: "10px 15px",
//                       marginBottom: "20px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     + Add Question
//                   </button>
//                 </div>
//               )}
//             </FieldArray>

//             <button
//               type="submit"
//               style={{ padding: "10px 20px", cursor: "pointer" }}
//             >
//               Create Quiz
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default CreateQuiz;

import React from "react";
import { Formik, FieldArray, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerQuiz } from "../feature/Quiz/quizSlice";

const quizSchema = yup.object({
  quizName: yup.string().min(3).required("Quiz name is required"),
  subjectId: yup.string().required("Subject ID is required"),
  attemptType: yup.string().oneOf(["Single", "Multiple"]).required(),
  startTime: yup.date().required("Start time is required"),
  endTime: yup.date().required("End time is required"),
  durationMintutes: yup.number().required("Duration is required"),
  status: yup.string().oneOf(["Active", "Inactive", "Completed"]),
  questions: yup
    .array()
    .of(
      yup.object({
        questionText: yup.string().required("Question is required"),
        questionType: yup.string().oneOf(["Multiple Choice", "True/False"]).required(),
        marks: yup.number().default(1),
        options: yup
          .array()
          .of(yup.string().required("Option cannot be empty"))
          .min(2, "At least 2 options are required"),
        correctAnswer: yup.string().required("Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

const CreateQuiz = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Create a Quiz</h2>

      <Formik
        initialValues={{
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
        }}
        validationSchema={quizSchema}
        onSubmit={(values) => {
          dispatch(registerQuiz(values));
        }}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            {/* Quiz Fields */}
            <div>
              <label>Quiz Name:</label>
              <input
                type="text"
                name="quizName"
                value={values.quizName}
                onChange={handleChange}
              />
              {touched.quizName && errors.quizName && (
                <div style={{ color: "red" }}>{errors.quizName}</div>
              )}
            </div>

            <div>
              <label>Subject ID:</label>
              <input
                type="text"
                name="subjectId"
                value={values.subjectId}
                onChange={handleChange}
              />
              {touched.subjectId && errors.subjectId && (
                <div style={{ color: "red" }}>{errors.subjectId}</div>
              )}
            </div>

            <div>
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

            <div>
              <label>Start Time:</label>
              <input
                type="datetime-local"
                name="startTime"
                value={values.startTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>End Time:</label>
              <input
                type="datetime-local"
                name="endTime"
                value={values.endTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Duration (minutes):</label>
              <input
                type="number"
                name="durationMintutes"
                value={values.durationMintutes}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Status:</label>
              <select
                name="status"
                value={values.status}
                onChange={handleChange}
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Questions */}
            <FieldArray name="questions">
              {(arrayHelpers) => (
                <div>
                  {values.questions.map((q, index) => (
                    <div key={index} style={{ border: "1px solid #ccc", padding: "15px", marginTop: "10px" }}>
                      <h4>Question {index + 1}</h4>

                      {/* Delete button */}
                      {values.questions.length > 1 && (
                        <button type="button" onClick={() => arrayHelpers.remove(index)} style={{ color: "red" }}>
                          Delete Question
                        </button>
                      )}

                      {/* Question Text */}
                      <div>
                        <label>Question Text:</label>
                        <input
                          type="text"
                          name={`questions[${index}].questionText`}
                          value={q.questionText}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Question Type */}
                      <div>
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

                      {/* Marks */}
                      <div>
                        <label>Marks:</label>
                        <input
                          type="number"
                          name={`questions[${index}].marks`}
                          value={q.marks}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Options */}
                      <div>
                        <label>Options:</label>
                        {q.options.map((opt, oIndex) => (
                          <div key={oIndex}>
                            <input
                              type="text"
                              name={`questions[${index}].options[${oIndex}]`}
                              value={opt}
                              onChange={handleChange}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Correct Answer */}
                      <div>
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
                  >
                    + Add Question
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Submit Button */}
            <button type="submit" style={{ marginTop: "20px" }}>
              Create Quiz
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuiz;
