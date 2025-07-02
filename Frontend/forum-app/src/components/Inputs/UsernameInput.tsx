import { Input } from "../ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "lucide-react";

type UsernameInputProps = {
  field: any;
};

export function UsernameInput({ field }: UsernameInputProps) {
  return (
    <FormItem>
      <FormLabel>
        <User />
        Username
      </FormLabel>
      <FormControl>
        <Input autoFocus placeholder="Your username" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
