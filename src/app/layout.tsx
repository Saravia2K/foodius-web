import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ClientNavbar from "@/layouts/ClientNavbar";
import Footer from "@/layouts/Footer";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ToastifyProvider from "@/providers/ToastifyProvider";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Foodius",
};

export default function RootLayout({ children }: TRootLayout) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ paddingTop: 100 }}>
        <ToastifyProvider>
          <ClientNavbar />
          {children}
          <Footer />
        </ToastifyProvider>
      </body>
    </html>
  );
}

type TRootLayout = Readonly<{
  children: React.ReactNode;
}>;
