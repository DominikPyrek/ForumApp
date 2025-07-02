import RegisterForm from "@/components/RegisterForm";
import { Card } from "@/components/ui/card";
import Wraper from "@/components/Wraper";
import { UserPlus } from "lucide-react";
function Register() {
  return (
    <>
      <Wraper>
        <h1 className="text-2xl mb-3">Register</h1>
        <UserPlus className="mx-auto h-10 w-10 text-primary mb-4" />
        <p className="text-muted-foreground mb-6">
          Fill in your information to register and get started.
        </p>
        <Card className="w-full max-w-lg hover:shadow-md transition-shadow p-5">
          <RegisterForm />
        </Card>
      </Wraper>
    </>
  );
}

export default Register;
