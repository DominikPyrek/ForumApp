import RegisterForm from "@/components/Login_Register/RegisterForm";
import LoginRegisterWrapper from "@/components/Login_Register/LoginRegisterWrapper";
import FormWrapper from "@/components/FormWrapper";
import RegisterHeader from "@/components/Login_Register/RegisterHeader";

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
