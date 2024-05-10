import Image from "next/image";
import { CartProduct, CartProductContext } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface ProductCartProps {
  productCart: CartProduct;
}
const CartItem = ({ productCart }: ProductCartProps) => {
  const { removeProductcart } = useContext(CartProductContext);
  return (
    <div className="mb-3 flex items-center justify-between  space-x-6">
      {/* IMAGEM  */}
      <div className="relative h-20  w-20 ">
        <Image
          src={productCart.imageUrl}
          alt={productCart.name}
          fill
          className="rounded-lg  object-cover"
        />
      </div>
      {/* INFO  */}
      <div className="w-40">
        <h3 className="text-sm font-semibold">{productCart.name}</h3>
        {/* PREÇO ORIGINAL E DESCONTO  */}
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold">
            {formatCurrency(calculateProductTotalPrice(productCart))}
          </h4>
          {Number(productCart.discountPercentage) > 0 && (
            <span className=" text-sm text-muted-foreground line-through">
              {formatCurrency(Number(productCart.price))}
            </span>
          )}
        </div>

        {/* QUANTIDADE  */}
        <div className="flex items-center gap-3 text-center">
          <Button
            variant={"ghost"}
            size="icon"
            className=" h-8 w-8 border border-solid"
          >
            <ChevronLeftIcon size={18} />
          </Button>
          <span className="w-2 text-sm">{productCart.quantity}</span>
          <Button size="icon" className=" h-8 w-8">
            <ChevronRightIcon size={18} />
          </Button>
        </div>
      </div>
      {/* BOTÃO DE DELETAR  */}
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={() => removeProductcart(productCart)}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
