import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Insira um e-mail válido"),
});
