import { PropsWithChildren } from "react";
import { Box, Modal, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import sxStyles from "./styles";
import styles from "./styles.module.scss";
import logo from "@/assets/images/foodius-logo.png";
import Image from "next/image";

export default function FormModal({
  open,
  error,
  children,
  onClose,
}: TComponentProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box p={6} sx={sxStyles.box}>
        <Image src={logo} alt="Foodius logo" className={styles.logo} />
        {error && <Alert severity="error">{error}</Alert>}
        {children}
        <IconButton onClick={onClose} sx={sxStyles.iconBtn}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
}

type TComponentProps = PropsWithChildren<{
  open: boolean;
  error?: string;
  onClose: () => void;
}>;
