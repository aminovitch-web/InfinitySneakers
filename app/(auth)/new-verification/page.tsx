import Link from "next/link";

import NewVerificationForm from "@/components/auth/new-verification-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const NewVerificationPage = () => {
  return (
    <div className="px-2 w-full">
      <Card className="mx-auto max-w-md mt-10 w-full">
        <CardContent>
          <CardHeader>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Confirm</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Confirm your verification
              </p>
            </div>
          </CardHeader>
          <div className="space-y-6">
            <NewVerificationForm />
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Back to{" "}
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

export default NewVerificationPage;
