import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

interface CategoryPageProps {
  params: {
    id: string;
  };
}
const CategoryPage = async ({ params: { id } }: CategoryPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return (
    <div className="px-5 ">
      <Header />
      <h2 className="mb-2 text-xl font-bold">{category?.name}</h2>
      <div className="grid grid-cols-2 gap-2">
        {category?.products.map((products) => (
          <div key={products.id}>
            <ProductItem product={products} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
