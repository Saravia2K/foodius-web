"use client";

import {
  Theme,
  SxProps,
  MenuItem,
  SelectChangeEvent,
  Select as MUISelect,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import style from "./styles.module.scss";

export default function Select({
  sx,
  value,
  fullWidth,
  items = [],
  onChange,
}: TProps) {
  return (
    <MUISelect
      fullWidth={fullWidth}
      sx={sx}
      value={value}
      onChange={onChange}
      className={style.select}
      IconComponent={KeyboardArrowDownIcon}
    >
      {items.map(({ text, value }, i) => (
        <MenuItem key={i} value={value}>
          {text}
        </MenuItem>
      ))}
    </MUISelect>
  );
}

type TProps = {
  sx?: SxProps<Theme>;
  value: any;
  items?: Item[];
  fullWidth?: boolean;
  onChange: (e: SelectChangeEvent) => any;
};

type Item = {
  text: string | number;
  value: string | number;
};
