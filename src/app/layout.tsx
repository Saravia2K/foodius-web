import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ToastifyProvider from "@/providers/ToastifyProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Foodius",
};

export default function RootLayout({ children }: TRootLayout) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ paddingTop: 100 }}>
        <ReactQueryProvider>
          <ToastifyProvider>{children}</ToastifyProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

type TRootLayout = Readonly<{
  children: React.ReactNode;
}>;
