"use client";
import { AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { Avatar } from "@radix-ui/react-avatar";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface OrderItemProps {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}
const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado!";
    case "COMPLETED":
      return "Finalizado";
    case "CONFIRMED":
      return "Confirmado";
    case "PREPARING":
      return "Preparado";
    case "DELIVERING":
      return "Em transporte";
  }
};
const OrderItem = ({ orders }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div
          className={`flex h-6 w-28 items-center justify-center rounded-md bg-[#EEEEEE] text-sm font-semibold text-white ${orders.status !== "COMPLETED" && "bg-green-500"}`}
        >
          <span>{getOrderStatusLabel(orders.status)}</span>
        </div>
        {/*INFO RESTAURANTE */}
        <div className="flex items-center justify-between gap-2">
          {/*IMAGEM */}
          <div className=" flex w-full gap-2">
            <div className=" h-4 w-4">
              <Avatar className="flex items-center">
                <AvatarImage
                  className="rounded-full object-cover"
                  src={orders.restaurant.imageUrl}
                />
              </Avatar>
            </div>
            <h2 className="text-sm font-semibold">{orders.restaurant.name}</h2>
          </div>

          <Button size="icon" variant="link">
            <Link href={`/restaurant/${orders.restaurantId}`}>
              <ChevronRightIcon size={18} />
            </Link>
          </Button>
        </div>
        <div className="py-3">
          <Separator />
        </div>

        {orders.products.map((product) => (
          <div key={product.orderId}>
            <div className="flex items-center gap-3">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7E8392]  text-sm text-white">
                <h1>{product.quantity}</h1>
              </div>
              <h1 className="text-muted-foreground">{product.product.name}</h1>
            </div>
          </div>
        ))}
        <div className="py-3">
          <Separator />
        </div>
        <div className="flex justify-between">
          <span>
            {formatCurrency(
              Number(orders.totalPrice) + Number(orders.restaurant.deliveryFee),
            )}
          </span>
          <h2 className=" font-semibold text-primary">Adicionar à Sacola</h2>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
