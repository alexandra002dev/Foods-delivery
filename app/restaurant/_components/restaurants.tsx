"use client";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
      console.log(restaurants);
    };
    fetchRestaurants();
  }, [searchFor]);

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
        <h2 className="mt-3 text-lg font-semibold ">Não encontrado!</h2>
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
