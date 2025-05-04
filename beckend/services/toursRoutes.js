import express from "express";
import {
  createTour,
  getTours,
  updateTour,
  deleteTour,
  getIdTour,
  getAirports,
  loginAdminController,
} from "./toursController.js";

const router = express.Router();

// Получить все туры
router.get("/", getTours);

router.get("/airports", getAirports);

router.get("/:id", getIdTour);

router.post("/", createTour);

router.put("/:id", updateTour);

router.delete("/:id", deleteTour);

router.post("/login", loginAdminController);

export default router;
