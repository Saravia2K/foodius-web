import { CSSProperties, PropsWithChildren } from "react";

export default function LandingSection({ children, className }: TProps) {
  return (
    <section
      className={className}
      style={{
        width: "100%",
        padding: "75px 200px",
      }}
    >
      {children}
    </section>
  );
}

type TProps = PropsWithChildren<{
  className?: string;
}>;
