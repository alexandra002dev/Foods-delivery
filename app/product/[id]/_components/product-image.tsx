"use client";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}
const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
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
    </div>
  );
};

export default ProductImage;
