import Link from "next/link";
import { CardContent, Card, CardHeader } from "@/components/ui/card";
import RegisterForm from "@/components/auth/register-form";
import SocialMedia from "@/components/auth/social-media";

const RegisterPage = () => {
  return (
    <div className="px-2">
      <Card className="mx-auto max-w-md mt-10">
        <CardContent className="space-y-6">
          <CardHeader>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your details to create an account
              </p>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <RegisterForm />
            <div className="flex items-center space-x-2">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              <span className="text-gray-500 dark:text-gray-400">or</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>
            <SocialMedia />
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
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

export default RegisterPage;
