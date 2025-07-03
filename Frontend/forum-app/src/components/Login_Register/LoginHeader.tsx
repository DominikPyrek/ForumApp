import { Lock } from "lucide-react";

export default function () {
  return (
    <>
      <h1 className="text-2xl mt-10 mb-3">Login</h1>
      <Lock className="mx-auto h-10 w-10 text-primary mb-4" />
      <p className="text-muted-foreground mb-6">
        Please enter your credentials to sign in to your account.
      </p>
    </>
  );
}
