import express from "express";
import {
  createTour,
  getTours,
  updateTour,
  deleteTour,
  getIdTour,
  getAirports,
  loginAdminController,
  getNews,
  getNewsId,
  createNews,
  updateNews,
  deleteNews,
  handleSubscribe
} from "./toursController.js";

const router = express.Router();

// Получить все туры
router.get("/", getTours);

router.get("/airports", getAirports);

router.get("/news", getNews);

router.get("/:id", getIdTour);

router.get("/news/:id", getNewsId);

router.post("/", createTour);

router.post("/news", createNews);

router.put("/:id", updateTour);

router.put("/news/:id", updateNews);

router.delete("/:id", deleteTour);

router.delete("/news/:id", deleteNews);

router.post("/login", loginAdminController);

router.post("/subscribe", handleSubscribe);

export default router;
