import { Button, ButtonProps } from "@mui/material";

import styles from "./styles.module.scss";

export default function ColoredButton(props: TProps) {
  const { color, className, ..._props } = props;
  return (
    <Button
      {..._props}
      variant="contained"
      className={[className || "", styles.color, color || "yellow"].join(" ")}
    >
      {props.children}
    </Button>
  );
}

type TProps = Omit<ButtonProps, "color" | "variant"> & {
  color?: "yellow" | "pink";
};
