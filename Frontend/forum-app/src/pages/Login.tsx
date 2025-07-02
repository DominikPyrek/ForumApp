import LoginForm from "@/components/Login/LoginForm";
import LoginHeader from "@/components/Login/LoginHeader";
import LoginRegisterWrapper from "@/components/Login/LoginRegisterWrapper";
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
