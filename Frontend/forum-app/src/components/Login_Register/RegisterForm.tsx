import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import UsernameInput from "../Inputs/UsernameInput";
import EmailInput from "../Inputs/EmailInput";
import BioInput from "../Inputs/BioInput";
import AvatarInput from "../Inputs/AvatarInput";
import PasswordInput from "../Inputs/PasswordInput";
import { RegisterFormSchema } from "@/schemas";
import AvatarPreview from "./AvatarPreview";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      bio: "",
      avatar: undefined,
    },
  });

  const avatar = form.watch("avatar");
  const { registerUser } = useRegister();

  const onSubmit = (data: z.infer<typeof RegisterFormSchema>) => {
    registerUser(data, () =>
      form.reset({
        username: "",
        password: "",
        email: "",
        bio: "",
        avatar: undefined,
      })
    );
  };

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
          render={({ field }) => <UsernameInput field={field} />}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => <PasswordInput field={field} />}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <EmailInput field={field} />}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => <BioInput field={field} />}
        />

        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => <AvatarInput field={field} />}
            />
          </div>
          <div className="col-span-1">
            <AvatarPreview file={avatar} />
          </div>
        </div>

        <Button type="submit" className="text-md">
          Register
        </Button>
      </form>
    </Form>
  );
}
