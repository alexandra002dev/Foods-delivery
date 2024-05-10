"use client";
import { Product, Restaurant } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
  restaurant: Pick<Restaurant, "deliveryFee">;
}

interface ICartContext {
  products: CartProduct[];
  /* eslint-disable no-unused-vars */
  removeProductcart: (Product: Product) => void;

  addProductToCart: (product: Product, quantity: number) => void;
}
export const CartProductContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
  removeProductcart: () => {},
});

export const CartProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  //* FUNÇÃO DE ADD AO CARRINHO
  const addProductToCart = (product: Product, quantity: number) => {
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
      value={{ products, addProductToCart, removeProductcart }}
    >
      {children}
    </CartProductContext.Provider>
  );
};
