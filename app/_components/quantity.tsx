import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Quantity = () => {
  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantity = () =>
    setQuantity((currentState: number) => currentState + 1);
  const handleDescreaseQuantity = () =>
    setQuantity((currentState: number) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });
  return (
    <div className="flex items-center gap-3 text-center">
      <Button
        variant={"ghost"}
        size="icon"
        className=" border border-solid"
        onClick={handleDescreaseQuantity}
      >
        <ChevronLeftIcon />
      </Button>
      <span className="w-4">{quantity}</span>
      <Button size="icon" onClick={handleIncreaseQuantity}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default Quantity;
