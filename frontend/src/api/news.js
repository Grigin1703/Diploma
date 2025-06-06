import axios from "axios";

const API_URL = "http://localhost:5000/api/tours/news";

// Получить список всех новостей
export const getNews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Получить новости по id
export const getIdNews = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Редактировать новость
export const updateNews = async (id, newsData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, newsData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Создать новость
export const createNews = async (newsData) => {
  const response = await axios.post(API_URL, newsData);
  return response.data;
};

// Удалить новость
export const deleteNews = async (id) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
