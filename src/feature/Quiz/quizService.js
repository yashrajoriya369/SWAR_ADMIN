import axios from "axios";
import { API_BASE } from "../../utils/base_url";

const create = async (quizData) => {
  try {
    const response = await axios.post(`${API_BASE}quizzes/`, quizData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to create quiz"
    );
  }
};

const getAllQuiz = async () => {
  try {
    const response = await axios.get(`${API_BASE}quizzes/`);
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
    const response = await axios.get(`${API_BASE}quizzes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch quiz"
    );
  }
};

const deleteQuiz = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}quizzes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to delete quiz"
    );
  }
};

const updateQuiz = async (quizId, quizData) => {
  try {
    const response = await axios.put(`${API_BASE}quizzes/${quizId}`, quizData);
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
