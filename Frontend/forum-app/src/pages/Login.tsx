import LoginForm from "@/components/Login_Register/LoginForm";
import LoginHeader from "@/components/Login_Register/LoginHeader";
import LoginRegisterWrapper from "@/components/Login_Register/LoginRegisterWrapper";
import FormWrapper from "@/components/FormWrapper";

export default function Login() {
  return (
    <>
      <LoginRegisterWrapper>
        <LoginHeader />
        <FormWrapper>
          <LoginForm />
        </FormWrapper>
      </LoginRegisterWrapper>
    </>
  );
}
