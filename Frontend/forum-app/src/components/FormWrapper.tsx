import { Card } from "./ui/card";

export default function FormWrapper({ children }: any) {
  return (
    <Card className="w-full max-w-lg hover:shadow-md transition-shadow p-5">
      {children}
    </Card>
  );
}
