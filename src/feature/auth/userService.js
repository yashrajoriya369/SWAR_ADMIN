import axios from "axios";
import { base_url } from "../../utils/base_url";

const register = async (userData) => {
  const response = await axios.post(`${base_url}auth/signup`, userData);
  if (response.data) {
    return response.data;
  }
};

export const userService = {
  register,
};
