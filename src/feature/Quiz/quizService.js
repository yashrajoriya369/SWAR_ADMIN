import axios from "axios";
import { base_url } from "../../utils/base_url";

const create = async (quizData) => {
  const response = await axios.post(`${base_url}quiz/`, quizData);
  if (response.data) {
    return response.data;
  }
};

export const quizService = {
  create,
};
