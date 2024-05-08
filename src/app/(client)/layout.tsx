import { PropsWithChildren } from "react";
import Main from "./components/Main";

export default function ClientLayout({ children }: PropsWithChildren) {
  return <Main>{children}</Main>;
}
