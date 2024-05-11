"use client";
import Cart from "@/app/_components/cart";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductsList from "@/app/_components/products-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";

import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { SheetContent, Sheet } from "@/app/_components/ui/sheet";
import { CartProductContext } from "@/app/_context/cart";

import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}
const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductInfoProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart, products } = useContext(CartProductContext);
  const addToCart = () => {
    addProductToCart({ ...product, quantity }, quantity);
    setIsCartOpen(true);
  };
  const handleAddToCartClick = () => {
    //VERIFICAR SE HÁ ALGUM PRODUTO DE OUTRO RESTAURANT NO CARRINHO
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );
    //SE  HOUVER ABRIR UM AVISO
    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    //SE NÃO ADICIONAR AO CARRINHO
    addToCart();
  };

  const handleIncreaseQuantity = () =>
    setQuantity((currentState: number) => currentState + 1);

  const handleDescreaseQuantity = () =>
    setQuantity((currentState: number) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });
  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] space-y-2 rounded-tl-3xl rounded-tr-3xl bg-white p-5">
        {/* RESTAURANT */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </div>
        </div>
        {/* NOME DO PRODUTO */}
        <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>
        {/* PREÇO DO PRODUTO E QUANTIDADE */}
        <div className="flex justify-between">
          {/* PREÇO COM DESCONTO */}
          <div>
            <div className="mb-3 mt-1 flex items-center gap-1">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {Number(product.discountPercentage) > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>
            {/* PREÇO ORIGINAL */}
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          </div>
          {/* QUANTIDADE */}
          <div className="flex items-center gap-3 text-center">
            <Button
              variant={"ghost"}
              size="icon"
              className=" border border-solid"
              onClick={handleDescreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button size="icon" onClick={handleIncreaseQuantity}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        {/* DADOS DA ENTREGA */}
        <Card className="flex justify-around py-3">
          {/*FRETE*/}
          <div className="flex flex-col items-center justify-center">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              Entrega <BikeIcon size={14} className="" />
            </span>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className=" font-bold">
                R$ {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className=" font-bold">Grátis</p>
            )}
          </div>
          {/*TIME*/}
          <div>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              Entrega <TimerIcon size={14} className="" />
            </span>
            <h2 className="font-bold">
              {Number(product.restaurant.deliveryTimeMinutes)} min
            </h2>
          </div>
        </Card>
        {/* SOBRE O PRODUTO */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Sobre</h2>
          <p className=" text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>
        {/* SUCOS */}
        {complementaryProducts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Sucos</h2>
            <ProductsList products={complementaryProducts} />
          </div>
        )}

        <Button onClick={handleAddToCartClick} className=" w-full">
          Adicionar à Sacola
        </Button>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <Cart setIsCartOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              deseja mesmo adicionar esse produto? Isso limpará sua sacola
              atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={addToCart}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
