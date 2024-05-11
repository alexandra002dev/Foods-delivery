import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`categorys/${category.id}`}>
      <div className="flex h-28 w-28 flex-col items-center justify-center gap-3 rounded-sm bg-white px-4 py-3 shadow-md">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={40}
          height={40}
        />
        <span className="text-sm font-semibold">{category.name}</span>
      </div>
    </Link>
  );
};

export default CategoryItem;
