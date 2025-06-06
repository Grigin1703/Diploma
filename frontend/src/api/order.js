import axios from "axios";

const API_URL = "http://localhost:5000/api/tours/subscribe";

export const handleSubscribe = async (email) => {
  return await axios.post(API_URL, { email });
};
