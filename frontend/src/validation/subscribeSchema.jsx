import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().min(5, "Поле обязательно").email("Введите норм почту"),
});
