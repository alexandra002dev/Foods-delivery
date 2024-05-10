import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";

const ButtonBack = () => {
  const router = useRouter();
  const handleBack = () => router.push("/");
  return (
    <Button
      onClick={handleBack}
      size="icon"
      className="rounded-full bg-white text-black hover:text-white"
    >
      <ChevronLeftIcon size={20} />
    </Button>
  );
};

export default ButtonBack;
