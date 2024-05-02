import ClientNavbar from "@/layouts/ClientNavbar";
import { PropsWithChildren } from "react";

export default function Header1Layout({ children }: PropsWithChildren) {
  return (
    <>
      <ClientNavbar />
      {children}
    </>
  );
}
