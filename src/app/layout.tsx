import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import "bootstrap/dist/css/bootstrap.min.css";

const inter = Poppins({ subsets: ["latin"], weight: "200" });

export const metadata: Metadata = {
  title: "Foodius",
};

export default function RootLayout({ children }: TRootLayout) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

type TRootLayout = Readonly<{
  children: React.ReactNode;
}>;
