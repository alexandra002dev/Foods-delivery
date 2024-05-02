import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className=" w-[266px] min-w-[266px] space-y-2">
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />

        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] text-sm">
          <StarIcon className="fill-yellow-500 text-yellow-500" size={12} />
          <span className=" flex text-xs font-semibold">5.0</span>
        </div>
        <Button
          size="icon"
          className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 "
        >
          <HeartIcon size={16} className=" fill-white" />
        </Button>
      </div>
      <h3 className="text-sm font-semibold">{restaurant.name}</h3>
      <div className="flex items-center  gap-3">
        <div className="flex items-center gap-1">
          <BikeIcon size={14} className="text-primary" />
          <span className="text-xs text-muted-foreground">
            {Number(restaurant.deliveryFee) === 0
              ? "Entrega Grátis"
              : formatCurrency(Number(restaurant.deliveryFee))}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <TimerIcon className="text-primary " size={14} />
          <span className="text-xs text-muted-foreground">
            {restaurant.deliveryTimeMinutes} min
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
