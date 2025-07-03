import { Input } from "../ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

type PasswordInputProps = {
  field: any;
};

export default function PasswordInput({ field }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItem>
      <FormLabel>
        <KeyRound />
        Password
      </FormLabel>
      <FormControl>
        <div className="flex">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
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
  );
}
