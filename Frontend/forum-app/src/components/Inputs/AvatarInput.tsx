import { Input } from "../ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUser } from "lucide-react";

type AvatarInputProps = {
  field: any;
};

export default function AvatarInput({ field }: AvatarInputProps) {
  return (
    <FormItem>
      <FormLabel>
        <FileUser />
        Avatar
      </FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => field.onChange(e.target.files?.[0])}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
