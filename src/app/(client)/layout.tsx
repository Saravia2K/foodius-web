"use client";

import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import useGlobalSettings from "@/hooks/useGlobalSettings";
import Footer from "@/layouts/Footer";

export default function ClientLayout({ children }: PropsWithChildren) {
  const { mainStyles } = useGlobalSettings((s) => s);

  return (
    <Box
      component="main"
      bgcolor="var(--white)"
      className="main"
      sx={mainStyles}
    >
      {children}
      <Footer />
    </Box>
  );
}
