import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import SocialMedia from "@/components/auth/social-media";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <Card className="mx-auto max-w-md mt-10">
      <CardContent className="space-y-6">
        <CardHeader>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email and password to access your account
            </p>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <LoginForm />
          <div className="text-right text-xs text-gray-500 dark:text-gray-400">
            <Link className="font-medium" href="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            <span className="text-gray-500 dark:text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          </div>
          <SocialMedia />
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link className="font-medium underline" href="/register">
              Register
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
