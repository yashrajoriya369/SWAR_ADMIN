import axios from "axios";
import { API_BASE } from "./base_url";

axios.defaults.baseURL = API_BASE;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;
