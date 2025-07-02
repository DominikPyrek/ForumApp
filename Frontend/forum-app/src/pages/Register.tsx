import RegisterForm from "@/components/RegisterForm";
import LoginRegisterWrapper from "@/components/Login/LoginRegisterWrapper";
import FormWrapper from "@/components/FormWrapper";
import RegisterHeader from "@/components/Login/RegisterHeader";

function Register() {
  return (
    <>
      <LoginRegisterWrapper>
        <RegisterHeader />
        <FormWrapper>
          <RegisterForm />
        </FormWrapper>
      </LoginRegisterWrapper>
    </>
  );
}

export default Register;
