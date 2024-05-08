"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconButton, Typography } from "@mui/material";
import { Container, Navbar } from "react-bootstrap";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import styles from "./styles.module.scss";
import logotipo from "@/assets/images/foodius-logotipo.png";

export default function OrdersNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleWindowScroll);

    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  function handleWindowScroll() {
    setScrolled(window.scrollY >= 100);
  }

  return (
    <Navbar
      fixed="top"
      expand="lg"
      variant="dark"
      className={[styles.navbar, scrolled && styles.scrolled].join(" ")}
    >
      <Container>
        <IconButton onClick={() => router.push("/negocios")}>
          <KeyboardBackspaceIcon
            style={{ color: "var(--pink)", fontSize: "40px" }}
          />
        </IconButton>
        <Typography fontFamily="inherit" color="var(--pink)" fontSize={20}>
          Volver a la tienda
        </Typography>
        <Image
          src={logotipo}
          alt="Logo"
          width={800}
          style={{ width: "auto", height: "70px", margin: "auto" }}
        />
      </Container>
    </Navbar>
  );
}
