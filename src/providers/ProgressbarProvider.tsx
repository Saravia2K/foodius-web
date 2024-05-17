"use client";

import { PropsWithChildren } from "react";
import { AppProgressBar } from "next-nprogress-bar";

export default function ProgressbarProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <AppProgressBar color="var(--pink)" />
    </>
  );
}
