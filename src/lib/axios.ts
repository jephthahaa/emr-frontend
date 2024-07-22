import { API_URL } from "@/constants";
import axios from "axios";

export default axios.create({
  baseURL: API_URL,
});

export const axiosAuth = axios.create({
  baseURL: API_URL,
});
