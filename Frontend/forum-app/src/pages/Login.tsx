import LoginForm from "@/components/LoginForm";
import { Card } from "@/components/ui/card";
import Wraper from "@/components/Wraper";

function Login() {
  return (
    <>
      <Wraper>
        <h1 className="text-2xl m-10">Login Form</h1>
        <Card className="w-full max-w-lg hover:shadow-md transition-shadow p-5">
          <LoginForm />
        </Card>
      </Wraper>
    </>
  );
}

export default Login;
