"use client";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurant] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;

      const foundRestaurant = await searchForRestaurants(searchFor);

      setRestaurant(foundRestaurant);
    };
    fetchRestaurants();
  }, [searchParams]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <div className="px-5 ">
      <Header />

      {restaurants.length > 0 && (
        <h2 className="mt-3 text-lg font-semibold ">
          Restaurantes Encontrados
        </h2>
      )}

      {restaurants.length === 0 && (
        <>
          <div className="mt-20 flex flex-col items-center justify-center">
            <div className=" relative h-[300px] w-full">
              <Image
                src="/notSearch.png"
                alt="não encontrado"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xl text-muted-foreground">Não encontrado!</p>
          </div>
        </>
      )}
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="mt-3">
          <RestaurantItem restaurant={restaurant} />
        </div>
      ))}
    </div>
  );
};

export default Restaurants;
