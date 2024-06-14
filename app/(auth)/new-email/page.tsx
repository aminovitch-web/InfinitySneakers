import NewEmailForm from "@/components/auth/new-email-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const NewEmailPage = () => {
  return (
    <div className="px-2 w-full">
      <Card className="mx-auto max-w-md mt-10 w-full">
        <CardContent>
          <CardHeader>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Confirm</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Confirm your email
              </p>
            </div>
          </CardHeader>
          <div className="space-y-6">
            <NewEmailForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewEmailPage;
