
import axios from "axios";
import { BASE_URL } from "./baseurl";



export const loginUser = (data) => {
  
  return axios.post(`${BASE_URL}/user/login`, data);
};
