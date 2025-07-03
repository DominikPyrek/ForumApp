import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/schemas";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "../ui/button";
import UsernameInput from "../Inputs/UsernameInput";
import PasswordInput from "../Inputs/PasswordInput";
import { useLogin } from "@/hooks/useLogin";
import { z } from "zod";

export default function LoginForm() {
  const { loginUser, loading } = useLogin();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    try {
      await loginUser(data);
      form.reset();
    } catch {
      form.setValue("password", "");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => <UsernameInput field={field} />}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => <PasswordInput field={field} />}
        />
        <Button type="submit" disabled={loading} className="text-md">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
