import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
});

export const avatarSchema = z
  .instanceof(File, { message: "Avatar is required" })
  .refine((file) => file.size <= 5242880, "File size must be less than 5MB")
  .refine((file) => file.type.startsWith("image/"), "Only images are allowed");

export const RegisterFormSchema = z.object({
  username: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
  email: z.string().email(),
  bio: z.string().max(500),
  avatar: avatarSchema,
});

export const PostDetailSchema = z.object({
  content: z.string().min(10).max(1200),
  post: z.string(),
});

export const CreatePostSchema = z.object({
  title: z.string().min(8).max(50),
  content: z.string().min(8).max(5000),
  preview_text: z.string().max(250),
});
