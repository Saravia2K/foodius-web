import { useState } from "react";
import {
  Collapse,
  ListItemText,
  ListItemButton,
  List as MUIList,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function List({ list = [] }: TProps) {
  const [open, setOpen] = useState(false);

  return (
    <MUIList sx={{ width: "100%", bgcolor: "var(--white)" }}>
      <ListItemButton onClick={() => setOpen((o) => !o)}>
        <ListItemIcon>
          <AccessTimeFilledIcon sx={{ color: "var(--pink)" }} />
        </ListItemIcon>
        <ListItemText
          primary="Abierto"
          sx={{ borderBottom: "2px solid var(--gray)" }}
          primaryTypographyProps={{ sx: { fontWeight: 800 } }}
        />
        {open ? (
          <ExpandLess sx={{ color: "var(--pink)" }} />
        ) : (
          <ExpandMore sx={{ color: "var(--pink)" }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <MUIList component="div" disablePadding>
          {list.map((l, i) => (
            <ListItemButton key={i} sx={{ pl: 9 }}>
              <ListItemText
                primary={l}
                primaryTypographyProps={{
                  sx: { fontSize: 13 },
                }}
              />
            </ListItemButton>
          ))}
        </MUIList>
      </Collapse>
    </MUIList>
  );
}

type TProps = {
  list: string[];
};
