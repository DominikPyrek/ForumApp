import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type PasswordInputProps = {
  field: any;
  label: string;
};

export function PasswordInput({ field, label }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="flex">
          <Input
            type={showPassword ? "text" : "password"}
            {...field}
            className="pr-10"
            placeholder="Your password"
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
