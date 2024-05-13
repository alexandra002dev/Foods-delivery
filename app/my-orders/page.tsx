import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import OrderItem from "./_components/order-item";

const MyOrdersPage = async () => {
  const session = await getServerSession({
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!session?.user) {
    return redirect("/");
  }
  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });
  return (
    <div className="space-y-5 py-5">
      <Header />
      <div className="space-y-5 px-5">
        <h1 className="text-lg font-bold">Meus Pedidos </h1>
        {orders.map((order) => (
          <OrderItem orders={order} key={order.id} />
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
