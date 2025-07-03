import { Input } from "../ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail } from "lucide-react";

type EmailInputProps = {
  field: any;
};

export default function EmailInput({ field }: EmailInputProps) {
  return (
    <FormItem>
      <FormLabel>
        <Mail />
        Email
      </FormLabel>
      <FormControl>
        <Input type="email" placeholder="Your email" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
