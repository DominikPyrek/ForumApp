import { Register } from "@/services/api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";
import { RegisterFormSchema } from "@/schemas";
import { useCallback } from "react";

export function useRegister() {
  const navigate = useNavigate();

  const registerUser = useCallback(
    async (data: z.infer<typeof RegisterFormSchema>, reset: () => void) => {
      try {
        await Register(data);
        reset();
        toast.success(
          "You have successfully registered. Redirecting to login shortly."
        );
        setTimeout(() => navigate("/login"), 300);
      } catch (error) {
        toast.error("Something went wrong: " + error);
      }
    },
    [navigate]
  );

  return { registerUser };
}
