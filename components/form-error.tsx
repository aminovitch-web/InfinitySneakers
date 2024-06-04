import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive font-medium">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <p className="flex-1">{message}</p>
    </div>
  );
};

export default FormError;
