"use client";

import { CSSProperties } from "react";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";

import igIcon from "@/assets/images/ig_logo.png";
import xIcon from "@/assets/images/x_logo.png";
import fbIcon from "@/assets/images/fb_logo.png";
import gIcon from "@/assets/images/g_logo.png";
import logotipo from "@/assets/images/foodius-logotipo.png";

export default function Footer() {
  return (
    <footer style={style}>
      <Grid
        container
        paddingBottom={6}
        style={{ borderBottom: "1px solid #a6a6a6 " }}
      >
        <Grid item xs={3}>
          <Image
            src={logotipo}
            alt="Logotipo"
            style={{
              width: "50%",
              height: "auto",
              objectFit: "contain",
              marginBottom: "35px",
            }}
          />
          <Typography fontFamily="inherit">
            En Foodius, creemos que la comida es más que una necesidad básica;
            es una experiencia que une a las personas y enriquece sus vidas.{" "}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <FooterList
            title="Servicios"
            items={["Servicio 1", "Servicio 2", "Servicio 3"]}
          />
        </Grid>
        <Grid item xs={3}>
          <FooterList
            title="Servicio al cliente"
            items={["Soporte", "Preguntas frecuentes"]}
          />
        </Grid>
        <Grid item xs={3}>
          <FooterList
            title="Contáctanos"
            items={[
              "Nuestras oficinas",
              "foodius@email.com",
              "(+503) xxxx-xxxx",
            ]}
          />
        </Grid>
      </Grid>
      <Grid container paddingTop={4} paddingX={5}>
        <Grid item xs display="flex" alignItems="center">
          <span style={{ color: "var(--pink)", fontWeight: 800 }}>©2024</span>{" "}
          Todos los derechos reservados Foodius S.A de C.V
        </Grid>
        <Grid
          item
          xs
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap="15px"
        >
          {socialNetworks.map(({ title, icon, link }, i) => (
            <Image
              key={i}
              src={icon}
              alt={title}
              title={title}
              style={{
                width: 25,
                height: "auto",
                cursor: "pointer",
              }}
              onClick={() => window.open(link)}
            />
          ))}
        </Grid>
      </Grid>
    </footer>
  );
}

const socialNetworks = [
  { title: "Instagram", icon: igIcon, link: "https://www.instagram.com" },
  { title: "X (antes Twitter)", icon: xIcon, link: "https://www.x.com" },
  { title: "Facebook", icon: fbIcon, link: "https://www.facebook.com" },
  { title: "Gmail", icon: gIcon, link: "https://www.gmail.com" },
];

const style: CSSProperties = {
  backgroundColor: "var(--white)",
  padding: 75,
};

type TFooterListProps = { title: string; items: string[] };
function FooterList({ title, items }: TFooterListProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
      }}
    >
      <h6 style={{ color: "var(--pink)", fontWeight: "800" }}>
        {title.toUpperCase()}
      </h6>
      {items.map((i, idx) => (
        <div key={idx}>{i}</div>
      ))}
    </div>
  );
}
