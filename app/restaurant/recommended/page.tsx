import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";
const RecommendedRestaurant = async () => {
  const restaurant = await db.restaurant.findMany({ take: 10 });

  return (
    <div className="px-5 ">
      <Header />

      <h2 className="mt-3 text-lg font-semibold ">Restaurantes Recomendados</h2>

      {restaurant.map((restaurant) => (
        <div key={restaurant.id} className="mt-3">
          <RestaurantItem restaurant={restaurant} />
        </div>
      ))}
    </div>
  );
};

export default RecommendedRestaurant;
