import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MessageSquareQuote } from "lucide-react";

type BioInputProps = {
  field: any;
};

export default function BioInput({ field }: BioInputProps) {
  return (
    <FormItem>
      <FormLabel>
        <MessageSquareQuote />
        Bio
      </FormLabel>
      <FormControl>
        <Textarea placeholder="Your bio" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
