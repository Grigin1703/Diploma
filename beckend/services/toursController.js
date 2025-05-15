import asyncHandler from "express-async-handler";
import { validateTourCreate, validateTourUpdate } from "./toursValidation.js";
import {
  createTourService,
  getAllTours,
  updateTourService,
  deleteTourService,
  getByIdTour,
  getAirportsByCity,
  loginAdminService,
  getAllNews,
  getNewsById,
  createNewsService,
  updateNewsService,
  deleteNewsService,
  sendMail,
  getHotTours,
} from "./toursService.js";

export const createTour = asyncHandler(async (req, res) => {
  validateTourCreate(req, res, async () => {
    const newTour = await createTourService(req.body);
    res.status(201).json(newTour);
  });
});

export const getTours = asyncHandler(async (req, res) => {
  const tours = await getAllTours(req.query);
  res.json(tours);
});

export const getIdTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tour = await getByIdTour(id);
  if (!tour) {
    res.status(400);
    throw new Error("тур не найден");
  }

  res.json(tour);
});

export const updateTour = asyncHandler(async (req, res) => {
  validateTourUpdate(req, res, async () => {
    const updatedTour = await updateTourService(req.params.id, req.body);

    if (!updatedTour) {
      res.status(404);
      throw new Error("Tour not found");
    }

    res.status(200).json(updatedTour);
  });
});

export const deleteTour = asyncHandler(async (req, res) => {
  const deleteTour = await deleteTourService(req.params.id);

  if (!deleteTour) {
    res.status(404);
    throw new Error("Тур не найден");
  }

  res.status(200).json({ message: "Тур удалён" });
});

export const getAirports = asyncHandler(async (req, res) => {
  const cityName = req.query.city;

  if (!cityName) {
    return res.status(400).json({ message: "Название города не указано" });
  }
  const airports = await getAirportsByCity(cityName);

  if (!airports) {
    return res.status(404).json({ message: "Аэропорты не найдены" });
  }

  res.json(airports);
});

export const loginAdminController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const { token } = await loginAdminService(username, password);
  res.json({ token });
});

export const getNews = asyncHandler(async (req, res) => {
  const news = await getAllNews();
  res.json(news);
});

export const getNewsId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const news = await getNewsById(id);
  return res.json(news);
});

export const createNews = asyncHandler(async (req, res) => {
  const newsData = req.body;
  const news = await createNewsService(newsData);
  return res.json(news);
});

export const updateNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedNews = await updateNewsService(id, updatedData);
  res.json(updatedNews);
});

export const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedNews = await deleteNewsService(id);
  res.json(deletedNews);
});

export const handleSubscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const hotTours = await getHotTours(); // Выбираем hot tours
  const tourList = hotTours
    .map((t) => `<li>${t.title} — от ${t.pricesByDuration[6]}₽</li>`)
    .join("");

  const html = `
    <h2>🔥 Горящие туры</h2>
    <ul>${tourList}</ul>
  `;

  await sendMail(email, "Горящие туры", "Смотрите лучшие предложения!", html);

  res.status(200).json({ message: "Письмо отправлено!" });
});
