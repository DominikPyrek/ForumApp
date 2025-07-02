import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Login } from "@/services/api";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loginUser(data: { username: string; password: string }) {
    setLoading(true);
    try {
      await Login(data);
      toast.success("You have successfully logged in. Redirecting shortly.");
      setTimeout(() => navigate("/posts"), 300);
    } catch (error: any) {
      if (error?.toString().includes("401")) {
        toast.error("Username and/or password is wrong, try again.");
      } else {
        toast.error("Something went wrong: " + error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { loginUser, loading };
}
