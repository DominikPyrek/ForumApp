import { Register } from "@/services/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const avatarSchema = z
  .instanceof(File, { message: "Avatar is required" })
  .refine((file) => file.size <= 5242880, "File size must be less than 5MB")
  .refine((file) => file.type.startsWith("image/"), "Only images are allowed");

const formSchema = z.object({
  username: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
  email: z.string().email(),
  bio: z.string().max(500),
  avatar: avatarSchema,
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      bio: "",
    },
  });

  const avatar = form.watch("avatar");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await Register(data);
      form.reset({
        username: "",
        password: "",
        email: "",
        bio: "",
      });
      toast("You have succesfully registered in redirecting to login shortly.");
      setTimeout(() => navigate("/posts"), 300);
    } catch (error) {
      toast("Somthing went wrong: " + error);
    }
  }

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    autoFocus
                    {...field}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-3"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Your bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {avatar && (
          <img
            src={URL.createObjectURL(avatar)}
            alt="Preview"
            className="h-24 w-24 rounded-full object-cover"
          />
        )}
        <Button type="submit" className="text-md">
          Register
        </Button>
      </form>
    </Form>
  );
}
