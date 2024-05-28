import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button className="w-full" variant="outline">
        <FaGoogle className="mr-2 h-5 w-5" />
        Google
      </Button>
      <Button className="w-full" variant="outline">
        <FaFacebook className="mr-2 h-5 w-5" />
        Facebook
      </Button>
    </div>
  );
};

export default SocialMedia;
