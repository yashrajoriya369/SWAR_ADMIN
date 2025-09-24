import axios from "axios";
import { base_url } from "../../utils/base_url";

const create = async (quizData) => {
  const response = await axios.post(`${base_url}quizzes/`, quizData);
  if (response.data) {
    return response.data;
  }
};

const getAllQuiz = async () => {
  const response = await axios.get(`${base_url}quizzes/`);
  return response.data;
};

const getAQuiz = async (id) => {
  const response = await axios.get(`${base_url}quizzes/${id}`);
  return response.data;
};

const deleteQuiz = async (id) => {
  const response = await axios.delete(`${base_url}quizzes/${id}`);
  return response.data;
};

export const quizService = {
  create,
  getAllQuiz,
  getAQuiz,
  deleteQuiz,
};
