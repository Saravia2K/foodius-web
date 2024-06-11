"use client";
import * as React from "react";
import styles from "./styles.module.scss";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Image from "next/image";
import watch from "@/assets/images/watch.svg";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import ColoredButton from "@/components/ColoredButton";

export default function HorariosPage() {
  return (
    <div>
      <div className="d-flex align-items-center">
        <h1
          style={{ fontSize: "60px", color: "var(--pink)", fontWeight: "bold" }}
          className="pe-3"
        >
          Horarios
        </h1>
        <Image src={watch} alt="reloj" width={50} />
      </div>

      <div className="py-5">
        <p>
          Selecciona un{" "}
          <span style={{ color: "var(--yellow)" }}>nuevo horario</span> para tu
          negocio
        </p>
        <Row className="d-flex align-items-center">
          <Col md={4}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={Days}
              renderInput={(params) => (
                <TextField {...params} label="Días de la Semana" />
              )}
            />
          </Col>
          <Col md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker label={"Hora de Apertura"} />
            </LocalizationProvider>
          </Col>

          <Col md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker label={"Hora de Cierre"} />
            </LocalizationProvider>
          </Col>

          <Col md={4} className="text-center">
            <ColoredButton fullWidth>Agregar Día</ColoredButton>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col md={4}>
            <TextField
              disabled
              fullWidth
              sx={{ backgroundColor: "#F5EFEF" }}
              id="outlined-disabled"
              defaultValue="Lunes"
            />
          </Col>
          <Col md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker />
            </LocalizationProvider>
          </Col>
          <Col md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker />
            </LocalizationProvider>
          </Col>
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center"
          >
            <div className={styles["button-container"]}>
              <Button variant="contained" className={styles["button-edit"]}>
                <SaveAsRoundedIcon />
              </Button>
              <Button variant="contained" className={styles["button-delete"]}>
                <DeleteRoundedIcon />
              </Button>
              <div className="pe-2"></div>
              <div></div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const Days = [
  { label: "Lunes" },
  { label: "Martes" },
  { label: "Miércoles" },
  { label: "Jueves" },
  { label: "Viernes" },
  { label: "Sábado" },
  { label: "Domingo" },
];
