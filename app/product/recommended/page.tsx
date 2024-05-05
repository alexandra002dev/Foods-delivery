import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";

import { db } from "@/app/_lib/prisma";
const RecommendedProducts = async () => {
  const products = await db.product.findMany({
    include: {
      restaurant: true,
    },

    take: 10,
  });

  return (
    <div className="px-5 ">
      <Header />
      <h2 className="mt-2 text-lg font-semibold ">Pedidos Recomendados</h2>

      {products.map((products) => (
        <div key={products.id} className="mt-3">
          <ProductItem product={products} />
        </div>
      ))}
    </div>
  );
};

export default RecommendedProducts;
