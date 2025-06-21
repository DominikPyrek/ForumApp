import RegisterForm from "@/components/RegisterForm";
import { Card } from "@/components/ui/card";
import Wraper from "@/components/Wraper";

function Register() {
  return (
    <>
      <Wraper>
        <h1 className="text-2xl m-10">Register Form</h1>
        <Card className="w-full max-w-lg hover:shadow-md transition-shadow p-5">
          <RegisterForm />
        </Card>
      </Wraper>
    </>
  );
}

export default Register;
