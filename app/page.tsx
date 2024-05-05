import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import ProductsList from "./_components/products-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <SearchInput />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-1 pt-6">
        <PromoBanner alt="Até 30% de desconto" src="/promo-banner-01.png" />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Link href={"/product/recommended"}>
            <Button
              variant={"ghost"}
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>

        <ProductsList products={products} />
      </div>
      <div className="px-1 pt-6">
        <PromoBanner
          alt="A partir de R$17,90 em lanches"
          src="/promo-banner-02.png"
        />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Link href={"/restaurant/recommended"}>
            <Button
              variant={"ghost"}
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>

        <RestaurantList />
      </div>
    </>
  );
};
export default Home;
