"use client";
import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalDiscount: number;
  totalPrice: number;
  totalQuantity: number;
  /* eslint-disable no-unused-vars */

  removeProductcart: (Product: CartProduct) => void;
  addProductToCart: (product: CartProduct, quantity: number) => void;
  descreaseQuantity: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
}
export const CartProductContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalDiscount: 0,
  totalPrice: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  removeProductcart: () => {},
  descreaseQuantity: () => {},
  increaseQuantity: () => {},
});

export const CartProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  //* TOTAL QUANTIDADE
  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);
  //*SUBTOTAL
  const subtotalPrice = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.price) * product.quantity,
      0,
    );
  }, [products]);

  //*TOTAL
  const totalPrice = useMemo(() => {
    return products.reduce(
      (acc, product) =>
        acc + calculateProductTotalPrice(product) * product.quantity,
      0,
    );
  }, [products]);

  //*DESCONTO
  const totalDiscount = subtotalPrice - totalPrice;

  //*INCREMENTAR QUANTIDADE
  const increaseQuantity = (productId: string) => {
    //VERIFICAR SE O PRODUTO JÁ ESTÁ NO CARRINHO
    const isProductAlreadyOnCarts = products.some(
      (cartProducts) => cartProducts.id === productId,
    );

    // SE ELE ESTIVER, AUMENTAR A SUA QUANTIDADE
    if (isProductAlreadyOnCarts) {
      const updatedProducts = products.map((cartProduct) =>
        cartProduct.id === productId
          ? {
              ...cartProduct,
              quantity: cartProduct.quantity + 1,
            }
          : cartProduct,
      );
      setProducts(updatedProducts);
      return;
    }
  };

  //*DECREMENTAR QUANTIDADE
  const descreaseQuantity = (productId: string) => {
    //VERIFICAR SE O PRODUTO JÁ ESTÁ NO CARRINHO
    const isProductAlreadyOnCarts = products.some(
      (cartProducts) => cartProducts.id === productId,
    );

    // SE ELE ESTIVER, AUMENTAR A SUA QUANTIDADE
    if (isProductAlreadyOnCarts) {
      const updatedProducts = products.map((cartProduct) =>
        cartProduct.id === productId
          ? {
              ...cartProduct,
              quantity: cartProduct.quantity > 1 ? cartProduct.quantity - 1 : 1,
            }
          : cartProduct,
      );
      setProducts(updatedProducts);
      return;
    }
  };

  //* FUNÇÃO DE ADD AO CARRINHO
  const addProductToCart = (product: CartProduct, quantity: number) => {
    //VERIFICAR SE HÁ ALGUM PRODUTO DE OUTRO RESTAURANT NO CARRINHO
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );
    if (hasDifferentRestaurantProduct) {
      return setProducts([
        {
          ...product,
          quantity: quantity,
        },
      ]);
      return;
    }
    //VERIFICAR SE O PRODUTO JÁ ESTÁ NO CARRINHO
    const isProductAlreadyOnCarts = products.some(
      (cartProducts) => cartProducts.id === product.id,
    );

    // SE ELE ESTIVER, AUMENTAR A SUA QUANTIDADE
    if (isProductAlreadyOnCarts) {
      const updatedProducts = products.map((cartProduct) =>
        cartProduct.id === product.id
          ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
          : cartProduct,
      );
      setProducts(updatedProducts);
      return;
    }
    // SE NÃO, ADICIONÁ-LO COM A QUANTIDADE RECEBIDA
    const updatedProducts = [...products, { ...product, quantity: quantity }];
    setProducts(updatedProducts);
  };

  //* FUNÇÃO DE REMOVE AO CARRINHO
  const removeProductcart = (product: Product) => {
    const updatedProducts = products.filter((item) => item.id !== product.id);
    setProducts(updatedProducts);
  };

  return (
    <CartProductContext.Provider
      value={{
        products,
        addProductToCart,
        removeProductcart,
        descreaseQuantity,
        increaseQuantity,
        subtotalPrice,
        totalPrice,
        totalDiscount,
        totalQuantity,
      }}
    >
      {children}
    </CartProductContext.Provider>
  );
};
