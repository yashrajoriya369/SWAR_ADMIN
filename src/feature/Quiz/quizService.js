import axios from "../../utils/axiosConfig";

const create = async (quizData) => {
  try {
    const response = await axios.post(`quizzes/`, quizData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to create quiz"
    );
  }
};

const getAllQuiz = async () => {
  try {
    const response = await axios.get(`quizzes/`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch quizzes"
    );
  }
};

const getAQuiz = async (id) => {
  try {
    const response = await axios.get(`quizzes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch quiz"
    );
  }
};

const deleteQuiz = async (id) => {
  try {
    const response = await axios.delete(`quizzes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to delete quiz"
    );
  }
};

const updateQuiz = async (quizId, quizData) => {
  try {
    const response = await axios.put(`quizzes/${quizId}`, quizData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to update quiz"
    );
  }
};

export const quizService = {
  create,
  getAllQuiz,
  getAQuiz,
  deleteQuiz,
  updateQuiz,
};
