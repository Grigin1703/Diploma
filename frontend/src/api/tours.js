import axios from "axios";

const API_URL = "http://localhost:5000/api/tours";

// Получить список всех туров
export const getTours = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Получить тур по id
export const getByIdTour = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Создать тур
export const createTour = async (tourData) => {
  const response = await axios.post(API_URL, tourData);
  return response.data;
};

// Обновить тур
export const updateTour = async (id, tourData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, tourData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Удалить тур
export const deleteTour = async (id) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Получить список аэропортов
export const getAirportsByCity = async (cityName) => {
  const response = await axios.get(`${API_URL}/airports`, {
    params: { city: cityName },
  });
  return response.data;
};
