import {
  Box,
  TextField,
  TextFieldProps,
  TextFieldVariants,
  Typography,
} from "@mui/material";

import style from "./styles.module.scss";

export default function Input(props: TComponentProps) {
  return (
    <Box>
      <Typography
        fontFamily="inherit"
        fontWeight="bold"
        color="#f20574"
        marginBottom={1}
      >
        {props.title}
      </Typography>
      <TextField fullWidth className={style["text-field"]} {...props} />
    </Box>
  );
}

type TComponentProps = {
  variant?: TextFieldVariants;
} & Omit<TextFieldProps, "variant" | "className"> & { title: string };
