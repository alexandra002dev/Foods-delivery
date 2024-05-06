"use client";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
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

      <h2 className="mt-3 text-lg font-semibold ">Restaurantes Encontrados</h2>

      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="mt-3">
          <RestaurantItem restaurant={restaurant} />
        </div>
      ))}
    </div>
  );
};

export default Restaurants;
