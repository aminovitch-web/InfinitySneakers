import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetPasswordForm = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          placeholder="Enter your new password"
          required
          type="password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          placeholder="Confirm your new password"
          required
          type="password"
        />
      </div>
      <Button className="w-full" type="submit">
        Reset Password
      </Button>
    </div>
  );
};

export default ResetPasswordForm;
