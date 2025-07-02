import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
});
