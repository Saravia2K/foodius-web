import { SxProps, Theme } from "@mui/material";

export default {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#ffffff",
    boxShadow: 24,
    borderRadius: 10,
  },
  iconBtn: {
    position: "absolute",
    top: 25,
    left: 25,
  },
} satisfies Record<string, SxProps<Theme>>;
