import { z } from "zod";

export const orederSchema = z.object({
  username: z
    .string()
    .min(3, "Поле обязательно")
    .regex(/^[А-ЯЁ][а-яё]+$/, "только буквы"),
  phone: z
    .string()
    .regex(
      /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/,
      "Введите полный номер телефона"
    ),
});
