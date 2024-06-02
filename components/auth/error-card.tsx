import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ErrorCard = () => {
  return (
    <div className="px-2">
      <Card className="mx-auto max-w-md mt-10">
        <CardContent className="space-y-6">
          <CardHeader>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold flex items-center justify-center w-full gap-2">
                <ExclamationTriangleIcon className="text-destructive w-[30px] h-[30px]" />
                Auth Error
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Oops! Something went wrong!
              </p>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <Button asChild variant="ghost">
                <Link className="font-medium" href="/login">
                  Back to login
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorCard;
