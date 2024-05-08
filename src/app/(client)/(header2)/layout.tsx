import OrdersNavbar from "@/layouts/OrdersNavbar";
import { PropsWithChildren } from "react";

export default function Header2Layout({ children }: PropsWithChildren) {
  return (
    <>
      <OrdersNavbar />
      {children}
    </>
  );
}
