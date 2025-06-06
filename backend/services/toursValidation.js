import Joi from "joi";

const tourSchema = (isUpdate = false) =>
  Joi.object({
    id: Joi.number().optional(),
    season: isUpdate
      ? Joi.string()
          .valid("Горящие туры", "Зима 2025/2026", "Весна 2026", "Лето 2025")
          .optional()
      : Joi.string()
          .valid("Горящие туры", "Зима 2025/2026", "Весна 2026", "Лето 2025")
          .required(),
    title: isUpdate
      ? Joi.string().max(255).optional()
      : Joi.string().max(255).required(),
    sub_title: isUpdate
      ? Joi.string().max(255).optional()
      : Joi.string().max(255).required(),
    rating: isUpdate
      ? Joi.number().integer().min(1).max(5).optional()
      : Joi.number().integer().min(1).max(5).required(),
    duration_min: isUpdate
      ? Joi.number().valid(6, 8, 10, 12, 15).optional()
      : Joi.number().valid(6, 8, 10, 12, 15).required(),
    duration_max: isUpdate
      ? Joi.number().valid(8, 10, 12, 15, 20).optional()
      : Joi.number().valid(8, 10, 12, 15, 20).required(),
    pricesByDuration: Joi.object({
      6: Joi.number().optional(),
      8: Joi.number().optional(),
      10: Joi.number().optional(),
      12: Joi.number().optional(),
      15: Joi.number().optional(),
      20: Joi.number().optional(),
    }).optional(),
    advantages: Joi.string().optional(),
    amenities: Joi.array().items(Joi.string()).optional(),
    location_neighborhood: Joi.array().items(Joi.string()).optional(),
    location_communication: Joi.array().items(Joi.string()).optional(),
    distance_airport: Joi.array().items(Joi.string()).optional(),
    beaches: Joi.array().items(Joi.string()).optional(),
    about_hotel: Joi.array().items(Joi.string()).optional(),
    sports_entertainment: Joi.array().items(Joi.string()).optional(),
    pool: Joi.array().items(Joi.string()).optional(),
    spa: Joi.array().items(Joi.string()).optional(),
    services: Joi.array().items(Joi.string()).optional(),
    contacts: Joi.array().items(Joi.string()).optional(),
    for_children: Joi.array().items(Joi.string()).optional(),
    mealPlans: Joi.array()
      .items(
        Joi.object({
          type: Joi.string()
            .valid(
              "All inclusive ultra",
              "All inclusive",
              "2-х разовое питание",
              "Только завтраки"
            )
            .required(),
          price: Joi.number().required(),
          details: Joi.array().items(Joi.string()).required(),
        })
      )
      .optional(),
    rating_details: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().required(),
          rating: Joi.number().required(),
        })
      )
      .optional(),
    imges: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().optional(),
          tour_id: Joi.number().optional(),
          image_url: Joi.array()
            .items(Joi.string().required()) // Массив строк
            .optional(),
        })
      )
      .optional(),
    rooms: Joi.array()
      .items(
        Joi.object({
          type: Joi.string()
            .valid("Comfort room", "Premium suite", "King suite")
            .required(),
          price: Joi.number().required(),
          images: Joi.string().required(),
          details: Joi.array().items(Joi.string()).required(),
          capacity: Joi.number().optional(),
        })
      )
      .optional(),
  });

// Валидация создания тура
export const validateTourCreate = (req, res, next) => {
  const { error } = tourSchema(false).validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details.map((d) => d.message) });
  }

  next();
};

// Валидация обновления тура
export const validateTourUpdate = (req, res, next) => {
  const { error } = tourSchema(true).validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details.map((d) => d.message) });
  }
  next();
};
