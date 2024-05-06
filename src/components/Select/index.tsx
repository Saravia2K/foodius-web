import {
  Theme,
  SxProps,
  MenuItem,
  SelectChangeEvent,
  Select as MUISelect,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import style from "./styles.module.scss";

export default function Select({ sx, value, items = [], onChange }: TProps) {
  return (
    <MUISelect
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
  onChange: (e: SelectChangeEvent) => any;
};

type Item = {
  text: string | number;
  value: string | number;
};
