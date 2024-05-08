"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Alert, Snackbar, Typography } from "@mui/material";
import Container from "react-bootstrap/Container";

import useOrder from "@/hooks/useOrder";
import useShoppingCart from "@/hooks/useShoppingCart";

import { ORDER_STATES } from "@/utils/enums";

import style from "./style.module.scss";

export default function TrackerPage() {
  const { token } = useParams<{ token: string }>();
  const { orderLoading, orderState } = useOrder(token);
  const { cleanCart } = useShoppingCart();
  const [openCancelledSnackbar, setOpenCancelledSnackbar] = useState(false);

  useEffect(() => {
    cleanCart();
  }, []);

  useEffect(() => {
    if (orderLoading) return;

    if (orderState == ORDER_STATES.CANCELED) setOpenCancelledSnackbar(true);
  }, [orderLoading]);

  const isInFirstStep = (state: ORDER_STATES) =>
    state == ORDER_STATES.ACTIVE ||
    state == ORDER_STATES.PREPARING ||
    state == ORDER_STATES.CANCELED;

  const isInMiddleStep = (state: ORDER_STATES) =>
    state == ORDER_STATES.DELIVERING;

  const isInFinalStep = (state: ORDER_STATES) =>
    state == ORDER_STATES.DELIVERED;

  if (orderLoading) return;
  return (
    <div>
      <div className={style.pruebita}>
        <Container>
          <div className={style.titulo}>
            <Typography
              component="h2"
              fontFamily="inherit"
              fontWeight={600}
              fontSize={50}
            >
              Monitoreando el <span className={style.pink}>estado</span> de tu
              pedido
            </Typography>
          </div>
        </Container>

        <div>
          <section className={style.step_wizard}>
            <ul className={style.step_wizard_list}>
              <li
                className={`${style.step_wizard_item} ${
                  isInFirstStep(orderState!) ? style.current_item : ""
                }`}
              >
                <span className={style.progress_count}>1</span>
                <span className={style.progress_label}>
                  Preparando tu pedido
                </span>
              </li>
              <li
                className={`${style.step_wizard_item} ${
                  isInMiddleStep(orderState!) ? style.current_item : ""
                }`}
              >
                <span className={style.progress_count}>2</span>
                <span className={style.progress_label}>
                  Tu pedido ya va en camino
                </span>
              </li>
              <li
                className={`${style.step_wizard_item} ${
                  isInFinalStep(orderState!) ? style.current_item : ""
                }`}
              >
                <span className={style.progress_count}>3</span>
                <span className={style.progress_label}>
                  Entregado con éxito
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Snackbar
        open={openCancelledSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenCancelledSnackbar(false)}
      >
        <Alert onClose={() => setOpenCancelledSnackbar(false)} severity="error">
          Este pedido fue cancelado por el usuario
        </Alert>
      </Snackbar>
    </div>
  );
}
