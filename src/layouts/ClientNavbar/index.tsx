"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Drawer } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ColoredButton from "@/components/ColoredButton";
import Login from "@/forms/Login";
import SignUp from "@/forms/SignUp";
import useSession from "@/hooks/useSession";
import ShoppingCart from "../ShoppingCart";

import style from "./styles.module.scss";
import logo from "@/assets/images/foodius-logo.png";

export default function ClientNavbar() {
  const session = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleWindowScroll);

    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  function handleWindowScroll() {
    setScrolled(window.scrollY >= 100);
  }

  const NotLoggedInItems = () => (
    <>
      <Nav.Item>
        <ColoredButton
          style={{ marginRight: 15 }}
          onClick={() => setOpenLogin(true)}
        >
          Iniciar Sesión
        </ColoredButton>
      </Nav.Item>
      <Nav.Item>
        <ColoredButton color="pink" onClick={() => setOpenSignUp(true)}>
          Registrarse
        </ColoredButton>
      </Nav.Item>
    </>
  );

  const LoggedInItems = () => (
    <>
      <Nav.Item>
        <ColoredButton
          style={{
            paddingLeft: "25px",
            paddingRight: "25px",
            marginRight: 15,
          }}
          onClick={() => setOpenDrawer(true)}
        >
          <LocalGroceryStoreIcon />
        </ColoredButton>
      </Nav.Item>
      <Nav.Item>
        <ColoredButton
          color="pink"
          style={{
            paddingLeft: "25px",
            paddingRight: "25px",
          }}
          onClick={() => session.logout()}
        >
          <ExitToAppIcon />
        </ColoredButton>
      </Nav.Item>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ShoppingCart onClose={() => setOpenDrawer(false)} />
      </Drawer>
    </>
  );

  return (
    <Navbar
      fixed="top"
      expand="lg"
      variant="dark"
      className={[style.navbar, scrolled && style.scrolled].join(" ")}
    >
      <Container>
        <Image
          src={logo}
          alt="Logo"
          width={400}
          style={{ width: "100px", height: "auto", aspectRatio: 1 }}
        />
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className="justify-content-end">
          <Nav className="ms-auto">
            {session.userLogged != undefined ? (
              <LoggedInItems />
            ) : (
              <NotLoggedInItems />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Login open={openLogin} onClose={() => setOpenLogin(false)} />
      <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} />
    </Navbar>
  );
}
