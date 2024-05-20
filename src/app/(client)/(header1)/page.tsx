"use client";

import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import LandingSection from "@/components/LandingSection";
import ColoredButton from "@/components/ColoredButton";

import styles from "./page.module.scss";
import landingImg from "@/assets/images/landing.png";
import landing2Img from "@/assets/images/Landing2.png";
import monitor from "@/assets/images/monitor.png";

export default function Home() {
  return (
    <main>
      {/* // TODO: Make this as code */}
      <Image
        src={landingImg}
        alt="Ordena tu comida favorita"
        width={6000}
        style={{ width: "100%", height: "auto" }}
      />

      <LandingSection>
        <Grid container spacing={10}>
          <Grid item xs={5}>
            <Image
              src={landing2Img}
              alt="Únete a foodius"
              className={styles["join-foodius-img"]}
            />
          </Grid>
          <Grid item xs={7} className={styles["text-centered-vertically"]}>
            <Typography
              component="h2"
              fontFamily="inherit"
              fontWeight={600}
              fontSize={50}
            >
              Únete a <span className={styles.pink}>#Foodius</span>
            </Typography>
            <Typography fontFamily="inherit" fontSize={20}>
              Estamos encantados de que estés considerando unirte a nosotros. Si
              tienes un negocio en línea para pedidos o estás pensando en
              comenzar uno, este es el lugar perfecto para ti.
            </Typography>
            <ColoredButton color="pink">Ver más</ColoredButton>
          </Grid>
        </Grid>
      </LandingSection>

      <LandingSection className={styles.foodius}>
        <Grid container spacing={25}>
          <Grid item xs={7} className={styles["text-centered-vertically"]}>
            <Typography
              fontFamily="inherit"
              color="#fff"
              fontWeight={600}
              fontSize={50}
            >
              Foodius
            </Typography>
            <Typography fontFamily="inherit" color="#fff" fontSize={20}>
              En Foodius, estamos comprometidos a hacer que tu experiencia de
              pedido de comida en línea sea fácil, rápida y deliciosa. ¿Te
              apetece algo? ¡Lo tenemos todo cubierto!
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Image
              src={monitor}
              alt="Foodius"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
      </LandingSection>
    </main>
  );
}
