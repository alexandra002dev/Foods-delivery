import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}
const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <div className=" flex  gap-[2px] rounded-full bg-primary px-2 py-[2px] text-sm text-white">
      <ArrowDownIcon size={12} />
      <span className=" flex text-xs font-semibold">
        {Number(product.discountPercentage)}%
      </span>
    </div>
  );
};

export default DiscountBadge;
