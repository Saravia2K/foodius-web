import OrdersNavbar from "@/layouts/OrdersNavbar";
import { PropsWithChildren } from "react";

export const metadata = {
  title: "Foodius | Orden",
};

export default function Header2Layout({ children }: PropsWithChildren) {
  return (
    <>
      <OrdersNavbar />
      {children}
    </>
  );
}
