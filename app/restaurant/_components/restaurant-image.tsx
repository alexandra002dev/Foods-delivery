"use client";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}
const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.back(); // Isso leva de volta para a última página acessada.
  };
  return (
    <div className="relative h-[200px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />

      <Button
        onClick={handleBack}
        size="icon"
        className="absolute left-4 top-4 rounded-full bg-white text-black hover:text-white"
      >
        <ChevronLeftIcon size={20} />
      </Button>
      <Button
        size="icon"
        className="absolute right-4 top-4 h-8 w-8 rounded-full bg-gray-700 "
      >
        <HeartIcon size={20} className=" fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
