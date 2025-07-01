import LoginForm from "@/components/LoginForm";
import { Card } from "@/components/ui/card";
import Wraper from "@/components/Wraper";
import { Lock } from "lucide-react";

function Login() {
  return (
    <>
      <Wraper>
        <h1 className="text-2xl mt-10 mb-3">Login</h1>
        <Lock className="mx-auto h-10 w-10 text-primary mb-4" />
        <p className="text-muted-foreground mb-6">
          Please enter your credentials to sign in to your account.
        </p>
        <Card className="w-full max-w-lg hover:shadow-md transition-shadow p-5">
          <LoginForm />
        </Card>
      </Wraper>
    </>
  );
}

export default Login;
