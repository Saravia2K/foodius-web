import { PropsWithChildren } from "react";
import { Box, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import sxStyles from "./styles";
import styles from "./styles.module.scss";
import logo from "@/assets/images/foodius-logo.png";
import Image from "next/image";

export default function FormModal({
  open,
  children,
  onClose,
}: TComponentProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box p={6} sx={sxStyles.box}>
        <Image src={logo} alt="Foodius logo" className={styles.logo} />
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
  onClose: () => void;
}>;
