import { useContext } from "react";
import { CartProductContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

const Cart = () => {
  const { products } = useContext(CartProductContext);
  //*SUBTOTAL
  const subtotal = products.reduce(
    (acc, qt) => acc + Number(qt.price) * qt.quantity,
    0,
  );
  //*ENTREGA
  const entrega = products.reduce(
    (acc, qt) => acc + Number(qt.restaurant.deliveryFee) * qt.quantity,
    0,
  );
  //*DESCONTO
  const desconto = products.reduce(
    (acc, qt) => acc + Number(qt.discountPercentage) * qt.quantity,
    0,
  );
  //*TOTAL

  const total = subtotal - desconto + entrega;

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold"> Sacola</h2>
        {products.map((item) => (
          <CartItem productCart={item} key={item.id} />
        ))}
      </div>
      <div>
        <Card>
          <CardContent>
            {/* SUBTOTAL */}
            <div className="flex justify-between py-3">
              <h3>Subtotal</h3>
              <span>R${formatCurrency(Number(subtotal))}</span>
            </div>
            <hr />
            {/* ENTREGA */}
            <div className="flex justify-between py-3">
              <h3>Entrega</h3>
              {Number(entrega) !== 0 ? (
                <span
                  className={`${Number(entrega) !== 0 ? "text-muted-foreground" : "text-red-600"}`}
                >
                  {" "}
                  R${formatCurrency(Number(entrega))}
                </span>
              ) : (
                <span
                  className={`${Number(entrega) !== 0 ? "text-muted-foreground" : "text-red-600"}`}
                >
                  {" "}
                  Grátis
                </span>
              )}
            </div>
            <hr />
            {/* DESCONTO */}
            <div className="flex justify-between py-3">
              <h3>Desconto</h3>
              <span>- R$ {formatCurrency(Number(desconto))}</span>
            </div>
            <hr />
            {/* TOTAL */}
            <div className="flex justify-between py-3 font-bold">
              <h3>Total</h3>
              <span>R$ {formatCurrency(Number(total))}</span>
            </div>
          </CardContent>
        </Card>
        <Button className="mt-5 w-full">Finalizar Pedido</Button>
      </div>
    </div>
  );
};

export default Cart;
