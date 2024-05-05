"use client";
import ProductsList from "@/app/_components/products-list";
import { Card } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantInfoProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: {
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true;
                };
              };
            };
          };
        };
      };
      products: {
        take: 10;
        include: {
          restaurant: {
            select: {
              name: true;
            };
          };
        };
      };
    };
  }>;
}
const RestaurantDetails = ({ restaurant }: RestaurantInfoProps) => {
  return (
    <div className="relative z-50 mt-[-1.5rem] space-y-4 rounded-tl-3xl rounded-tr-3xl bg-white p-5">
      {/* RESTAURANT */}
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-8 w-8">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-[2px] rounded-full bg-[#323232] px-2 py-[2px] text-sm">
          <StarIcon className="fill-yellow-500 text-yellow-500" size={12} />
          <span className=" flex text-xs font-semibold text-white">5.0</span>
        </div>
        <div className="text-xl font-semibold">{restaurant.name}</div>
      </div>

      {/* DADOS DA ENTREGA */}
      <Card className="flex justify-around py-3">
        {/*FRETE*/}
        <div className="flex flex-col items-center justify-center">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            Entrega <BikeIcon size={14} className="" />
          </span>

          {Number(restaurant.deliveryFee) > 0 ? (
            <p className=" font-bold">
              R$ {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className=" font-bold">Grátis</p>
          )}
        </div>
        {/*TIME*/}
        <div>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            Entrega <TimerIcon size={14} className="" />
          </span>
          <h2 className="font-bold">{restaurant.deliveryTimeMinutes} min</h2>
        </div>
      </Card>
      {/*CATEGORY*/}
      <div className="mt-4 flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((item) => (
          <div
            className=" flex min-w-[167px] items-center justify-center rounded-sm bg-[#f4f4f5] text-muted-foreground"
            key={item.id}
          >
            {item.name}
          </div>
        ))}
      </div>
      {/* TODO: MAIS PEDIDOS */}
      <div className="mt-6  space-y-5">
        <h2 className="text-xl font-semibold"> Mais Pedidos</h2>
        <ProductsList products={restaurant.products} />
      </div>
      {/* CATEGORIAS */}
      {restaurant.categories.map((category) => (
        <div className="mt-6  space-y-5 " key={category.id}>
          <h2 className="text-xl font-semibold"> {category.name}</h2>
          <ProductsList products={category.products} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantDetails;
