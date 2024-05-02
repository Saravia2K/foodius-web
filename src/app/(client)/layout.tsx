import Footer from "@/layouts/Footer";
import { PropsWithChildren } from "react";

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
