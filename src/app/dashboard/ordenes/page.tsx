"use client";

import styles from "./styles.module.scss";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import StorefrontIcon from "@mui/icons-material/Storefront";
import TungstenRoundedIcon from "@mui/icons-material/TungstenRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { textAlign } from "@mui/system";

export default function OrdenesPage() {
  const [contenidoActivo, setContenidoActivo] = useState("contenido1"); // Initialize with 'contenido1'

  const handleClick = (contenido: string | null) => {
    if (contenido) {
      setContenidoActivo(contenido);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Container>
        <div className={styles.hola}>
          <h2 style={{ color: "#F20574" }}>
            <b>Órdenes</b>
            <StorefrontIcon className={styles.shop}></StorefrontIcon>
          </h2>
        </div>
        <p>
          Visualiza tus ordenes y entregas en{" "}
          <b>
            <span style={{ color: "#f3ab26" }}>tiempo real</span>
          </b>
        </p>

        <Nav
          variant="underline"
          activeKey={contenidoActivo}
          onSelect={(selectedKey: string | null) => handleClick(selectedKey)}
        >
          <Nav.Item style={{ color: "#F20574" }}>
            <Nav.Link eventKey="contenido1">Activas</Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ color: "#F20574" }}>
            <Nav.Link eventKey="contenido2">Historial</Nav.Link>
          </Nav.Item>
        </Nav>

        {contenidoActivo === "contenido1" && (
          <div>
            <Table className={styles.customtable}>
              <thead>
                <tr>
                  <th>ID Orden </th>
                  <th>Estado </th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0123456789</td>
                  <td>
                    <TungstenRoundedIcon
                      style={{
                        color: "#F20574",
                        fontSize: "24px",
                        marginRight: "8px",
                        transform: "rotate(180deg)",
                      }}
                    />
                    <span>Activa</span>
                  </td>
                  <td>Ahora</td>
                  <td>2:15 p.m.</td>
                  <td>Ricardo M.</td>
                  <td>
                    <AddCircleOutlineRoundedIcon
                      style={{
                        color: "#F20574",
                        fontSize: "24px",
                        marginRight: "8px",
                      }}
                    />
                    <span>$8.50</span>
                  </td>
                  <td>
                    <Button
                      style={{
                        color: "#ffffff",
                        backgroundColor: "#F2A007",
                        borderRadius: "50px",
                        marginTop: "-10px",
                        height: "40px",
                        border: "none",
                      }}
                    >
                      Entregado
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>0123456789</td>
                  <td>
                    <TungstenRoundedIcon
                      style={{
                        color: "#F20574",
                        fontSize: "24px",
                        marginRight: "8px",
                        transform: "rotate(180deg)",
                      }}
                    />
                    <span>Activa</span>
                  </td>
                  <td>Ahora</td>
                  <td>2:15 p.m.</td>
                  <td>Ricardo M.</td>
                  <td>
                    <AddCircleOutlineRoundedIcon
                      style={{
                        color: "#F20574",
                        fontSize: "24px",
                        marginRight: "8px",
                      }}
                    />
                    <span>$8.50</span>
                  </td>
                  <td>
                    <Button
                      style={{
                        color: "#ffffff",
                        backgroundColor: "#F2A007",
                        borderRadius: "50px",
                        marginTop: "-10px",
                        height: "40px",
                        border: "none",
                      }}
                    >
                      Entregado
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
        {contenidoActivo === "contenido2" && (
          <div>
            <Table className={styles.customtable}>
              <thead>
                <tr>
                  <th>ID Orden </th>
                  <th>Estado </th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0123456789</td>
                  <td>
                    <CancelRoundedIcon
                      style={{
                        color: "#F20574",
                        fontSize: "24px",
                        marginRight: "8px",
                      }}
                    />
                    <span>Cancelada</span>
                  </td>
                  <td>Ahora</td>
                  <td>1:15 p.m.</td>
                  <td>Emilia E.</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <AddCircleOutlineRoundedIcon
                        style={{
                          color: "#F20574",
                          fontSize: "24px",
                          marginRight: "8px",
                        }}
                      />
                      <span>$7.50</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>0123456789</td>
                  <td>
                    <TungstenRoundedIcon
                      style={{
                        color: "#F20574",
                        fontSize: "24px",
                        marginRight: "8px",
                        transform: "rotate(180deg)",
                      }}
                    />
                    <span>Activa</span>
                  </td>
                  <td>Ahora</td>
                  <td>2:15 p.m.</td>
                  <td>Ricardo M.</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <AddCircleOutlineRoundedIcon
                        style={{
                          color: "#F20574",
                          fontSize: "24px",
                          marginRight: "8px",
                        }}
                      />
                      <span>$8.50</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>0123456789</td>
                  <td>
                    <TaskAltRoundedIcon
                      style={{
                        color: "#F20574",
                        fontSize: "24px",
                        marginRight: "8px",
                      }}
                    />
                    <span>Entregado</span>
                  </td>
                  <td>Ahora</td>
                  <td>7:15 p.m.</td>
                  <td>Ricardo M.</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <AddCircleOutlineRoundedIcon
                        style={{
                          color: "#F20574",
                          fontSize: "24px",
                          marginRight: "8px",
                        }}
                      />
                      <span>$8.50</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}

        <Button variant="primary" onClick={handleShow}>
          El modalito
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header  className="border-0">
            <Button className="border-0" variant="light" onClick={handleClose}>
              <b>X</b>
            </Button>
          </Modal.Header>
          <Modal.Body>
            <h2>
              <span style={{ color: "#F20574", fontWeight: "bold" }}>
                Detalles de la orden{" "}
              </span>
            </h2>
            <p>ID Orden: 012345678</p>
            <Table borderless>
              <thead>
                <tr>
                  <th>Elementos</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Empanadas</td>
                  <td>$0.50</td>
                  <td>3</td>
                  <td>$1.50</td>
                </tr>
                <tr>
                  <td>Tamales</td>
                  <td>$1.00</td>
                  <td>4</td>
                  <td>$3.00</td>
                </tr>
                <tr>
                  <td>Elote Loco</td>
                  <td>$1.50</td>
                  <td>2</td>
                  <td>$4.00</td>
                </tr>
              </tbody>
            </Table>

            <div style={{ textAlign: "end", paddingTop: "5px" }}>
              <b>Total: $8.50</b>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
