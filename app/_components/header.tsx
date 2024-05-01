import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image src="/Logo.png" alt="FSW Foods" height={30} width={100} />
      <Button
        size="icon"
        variant="outline"
        className="bg-transparente border-none"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
