import { Dispatch, SetStateAction, useContext, useState } from "react";
import { CartProductContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface CartProps {
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}
const Cart = ({ setIsCartOpen }: CartProps) => {
  const router = useRouter();
  const [isDialog, setIsDialog] = useState(false);
  const [isDialogLogin, setIsDialogLogin] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { data } = useSession();

  const { products, subtotalPrice, totalPrice, totalDiscount, clearCart } =
    useContext(CartProductContext);

  const handleFinishOrderClick = async () => {
    if (!data?.user) {
      setIsDialogLogin(true);
      return;
    }
    try {
      await createOrder({
        subtotalPrice,
        totalDiscounts: totalDiscount,
        totalPrice,
        deliveryFree: products[0].restaurant.deliveryFee,
        DeliveryTime: products[0].restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: products[0].restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: {
            email: data?.user?.email || "",
          },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });
      toast("Pedido finalizado com sucesso!", {
        description: "Você pode acompanhá-lo na tela dos seus pedidos.",
        action: {
          label: "Meus Pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });

      clearCart();
      setIsCartOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(true);
    }
  };

  return (
    <>
      <h2 className="mb-2 text-lg font-bold"> Sacola</h2>
      {products.length > 0 ? (
        <div className="flex h-full flex-col justify-between">
          <div>
            {products.map((product) => (
              <CartItem productCart={product} key={product.id} />
            ))}
          </div>
          <div className="mb-5">
            <Card>
              <CardContent>
                {/* SUBTOTAL */}
                <div className="flex justify-between py-3">
                  <h3>Subtotal</h3>
                  <span>{formatCurrency(Number(subtotalPrice))}</span>
                </div>
                <hr />
                {/* ENTREGA */}
                <div className="flex justify-between py-3">
                  <h3>Entrega</h3>

                  {Number(products[0].restaurant.deliveryFee) === 0 ? (
                    <span className="text-primary"> Grátis </span>
                  ) : (
                    <span>
                      {formatCurrency(
                        Number(products[0].restaurant.deliveryFee),
                      )}
                    </span>
                  )}
                </div>
                <hr />
                {/* DESCONTO */}
                <div className="flex justify-between py-3">
                  <h3>Desconto</h3>
                  <span>- {formatCurrency(Number(totalDiscount))}</span>
                </div>
                <hr />
                {/* TOTAL */}
                <div className="flex justify-between py-3 font-bold">
                  <h3>Total</h3>
                  <span>
                    {formatCurrency(
                      Number(totalPrice) +
                        Number(products[0].restaurant.deliveryFee),
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Button className="mt-5 w-full" onClick={() => setIsDialog(true)}>
              Finalizar Pedido
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center text-center">
          <span className="text-lg font-semibold text-muted-foreground">
            Sacola Vazia!
          </span>
        </div>
      )}
      <Dialog open={isDialog} onOpenChange={setIsDialog}>
        <DialogContent className="h-72 w-60 ">
          <DialogHeader className="flex items-center  justify-center text-center">
            <DialogTitle>
              <CheckCircle2 size={72} className="text-primary" />
            </DialogTitle>
            <h2 className="text-lg font-semibold">Pedido Efetuado!</h2>
            <DialogDescription>
              Seu pedido foi realizado com sucesso.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleFinishOrderClick} disabled={isSubmitLoading}>
            {isSubmitLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirmar
          </Button>
        </DialogContent>
      </Dialog>

      {/* DIALOGO PARA FAZER LOGIN */}
      <Dialog open={isDialogLogin} onOpenChange={setIsDialogLogin}>
        <DialogContent className="h-72 w-60 ">
          <DialogHeader className="flex items-center  justify-center text-center">
            <h2 className="text-lg font-semibold">Faça login na plataforma!</h2>
            <DialogDescription>
              Conecte-se usando sua conta do Google.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => signIn()}>Google</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Cart;
