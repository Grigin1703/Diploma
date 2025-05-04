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
