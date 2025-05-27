import axios from "axios";

const API_URL = "http://localhost:5000/api/tours";

export const getTours = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении туров", err);
    return [];
  }
};

export const getToursAdmin = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении туров", err);
    return [];
  }
};

export const getByIdTour = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получения тура:", error);
  }
};

export const getByIdTourAdmin = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получения тура:", error);
  }
};

export const createTour = async (tourData) => {
  try {
    const response = await axios.post(API_URL, tourData);
    return response.data;
  } catch (error) {
    alert(`Ошибка при создании тура: ${error.response.data.error}`);
  }
};

export const updateTour = async (id, tourData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${API_URL}/${id}`, tourData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    alert(`Ошибка при обновлении тура: ${error.response.data.error}`);
  }
};

export const deleteTour = async (id) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Ошибка при удалении тура:", error);
  }
};

export const getAirportsByCity = async (cityName) => {
  try {
    const response = await axios.get(`${API_URL}/airports`, {
      params: { city: cityName },
    });
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении аэропортов", err);
    return [];
  }
};

export const loginAdmin = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return res.data.token;
  } catch (err) {
    const message =
      err.response?.data?.message || "Ошибка при входе. Попробуйте снова.";
    throw new Error(message);
  }
};

export const getNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении туров", err);
    return [];
  }
};

export const getIdNews = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получения новости:", error);
  }
};

export const updateNews = async (id, newsData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${API_URL}/news/${id}`, newsData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при редактировании новости:", error);
  }
};

export const createNews = async (newsData) => {
  try {
    const response = await axios.post(`${API_URL}/news`, newsData);
    return response.data;
  } catch (error) {
    alert(`Ошибка при создании новости: ${error.response.data.error}`);
  }
};

export const handleSubscribe = async (email) => {
  if (!email) {
    alert("Введите email!");
    return;
  }

  try {
    await axios.post(`${API_URL}/subscribe`, { email });
    alert("Письмо отправлено!");
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    alert("Ошибка. Попробуйте снова.");
  }
};
