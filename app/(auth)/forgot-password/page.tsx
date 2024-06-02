import Link from "next/link";
import { CardContent, Card, CardHeader } from "@/components/ui/card";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <div className="px-2">
      <Card className="mx-auto max-w-md mt-10">
        <CardContent className="space-y-6">
          <CardHeader>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your email to reset your password
              </p>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <ForgotPasswordForm />
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Remember your password?{" "}
              <Link className="font-medium underline" href="/login">
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
