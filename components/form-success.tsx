import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 font-medium">
      <CheckCircledIcon className="w-4 h-4" />
      <p className="flex-1">{message}</p>
    </div>
  );
};

export default FormSuccess;
