"user client";

import style from "./style.module.scss";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap";

import { Typography } from "@mui/material";

export default function tracker() {
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
              <li className={style.step_wizard_item}>
                <span className={style.progress_count}>1</span>
                <span className={style.progress_label}>Preparando tu pedido</span>
              </li>
              <li className={`${style.step_wizard_item} ${style.current_item}`}>
                <span className={style.progress_count}>2</span>
                <span className={style.progress_label}>
                  Tu pedido ya va en camino
                </span>
              </li>
              <li className={style.step_wizard_item}>
                <span className={style.progress_count}>3</span>
                <span className={style.progress_label}>Entregado con éxito</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}


