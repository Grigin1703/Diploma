import axios from "axios";

const API_URL = "http://localhost:5000/api/tours/login";

export const loginAdmin = async (username, password) => {
  const res = await axios.post(API_URL, {
    username,
    password,
  });
  return res.data.token;
};
