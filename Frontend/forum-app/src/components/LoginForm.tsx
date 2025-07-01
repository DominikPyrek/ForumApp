import { Login } from "@/services/api";
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
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await Login(data);
      form.reset({
        username: "",
        password: "",
      });
      toast("You have succesfully logged in redirecting shortly.");
      setTimeout(() => navigate("/posts"), 300);
    } catch (error) {
      if (error?.toString().includes("401")) {
        toast("Username and/or password is wrong, try again.");
      } else {
        toast("Somthing went wrong: " + error);
      }
      form.reset({
        username: data.username,
        password: "",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="Your username" {...field} />
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

        <Button type="submit" className="text-md">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
