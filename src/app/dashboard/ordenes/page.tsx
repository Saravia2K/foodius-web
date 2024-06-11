"use client";

import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MUIModal from "@mui/material/Modal";
import {
  Box,
  Paper,
  Backdrop,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ColoredButton from "@/components/ColoredButton";

import StorefrontIcon from "@mui/icons-material/Storefront";
import EmojiObjectsRoundedIcon from "@mui/icons-material/EmojiObjectsRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SoupKitchenRoundedIcon from "@mui/icons-material/SoupKitchenRounded";
import DeliveryDiningRoundedIcon from "@mui/icons-material/DeliveryDiningRounded";

import useSession from "@/hooks/useSession";
import useOrders, { TOrder } from "@/hooks/useOrders";
import { TOrderState } from "@/utils/types";
import { API_URL } from "@/utils/consts";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type TSection = "activas" | "historial";
export default function OrdenesPage() {
  const [contenidoActivo, setContenidoActivo] = useState<TSection>("activas");
  const { businessLogged } = useSession();
  const { orders, reloadOrders } = useOrders(businessLogged?.id ?? 0);
  const [actives, setActives] = useState<TOrder[]>([]);
  const [historial, setHistorial] = useState<TOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<TOrder>();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const toCancelOrderId = useRef(0);

  useEffect(() => {
    if (!orders) return;

    const ordersValues = Object.values(orders);
    const activeStates: TOrderState[] = ["ACTIVE", "PREPARING", "DELIVERING"];
    setActives(ordersValues.filter((o) => activeStates.indexOf(o.state) > -1));
    setHistorial(
      ordersValues.filter((o) => activeStates.indexOf(o.state) == -1)
    );
  }, [orders]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<{ message: string }>({
    defaultValues: {
      message: "",
    },
  });

  const handleCancelFormSubmit: SubmitHandler<{ message: string }> = async ({
    message,
  }) => {
    const fetchRes = await fetch(
      `${API_URL}/orders/${toCancelOrderId.current}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    if (!fetchRes.ok) {
      toast("Orden cancelada con éxito", {
        type: "success",
      });
      reloadOrders();
    } else {
      toast("La orden no pudo ser cancelada", {
        type: "error",
      });
    }

    toCancelOrderId.current = 0;
    setShowCancelForm(false);
    reset();
  };

  const updateOrderState = async (orderId: number, state: string) => {
    setShowBackdrop(true);

    const fetchRes = await fetch(`${API_URL}/orders/${orderId}/state`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state }),
    });

    if (fetchRes.ok) {
      toast("Estado de la orden actualizado", {
        type: "success",
      });
      await reloadOrders();
    } else {
      toast("No se pudo actualizar el estado de la orden", {
        type: "error",
      });
    }

    setShowBackdrop(false);
  };

  const getID = (id: number) =>
    id.toLocaleString("en", {
      minimumIntegerDigits: 10,
      useGrouping: false,
    });

  const getTime = (datetime: string) =>
    new Date(datetime).toLocaleTimeString("en", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });

  const isToday = (datetime: string) => {
    const date = new Date(datetime).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    return date == today;
  };

  const NEXT_STEPS = {
    ACTIVE: {
      text: "Preparar",
      state: "PREPARING",
      Icon: EmojiObjectsRoundedIcon,
    },
    PREPARING: {
      text: "Enviar",
      state: "DELIVERING",
      Icon: SoupKitchenRoundedIcon,
    },
    DELIVERING: {
      text: "Finalizar",
      state: "FINISHED",
      Icon: DeliveryDiningRoundedIcon,
    },
    FINISHED: {
      text: "",
      state: "",
      Icon: TaskAltRoundedIcon,
    },
    CANCELED: {
      text: "",
      state: "",
      Icon: CancelRoundedIcon,
    },
  };

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
          onSelect={(selectedKey) =>
            setContenidoActivo(selectedKey as TSection)
          }
        >
          <Nav.Item style={{ color: "#F20574" }}>
            <Nav.Link eventKey="activas">Activas</Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ color: "#F20574" }}>
            <Nav.Link eventKey="historial">Historial</Nav.Link>
          </Nav.Item>
        </Nav>

        {contenidoActivo === "activas" && (
          <div>
            <Table className={styles.customtable}>
              <thead>
                <tr>
                  <th>ID Orden </th>
                  <th>Estado </th>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {actives.map((a, i) => {
                  const { state, text, Icon } =
                    NEXT_STEPS[a.state as keyof typeof NEXT_STEPS];
                  return (
                    <tr key={i}>
                      <td>{getID(a.id)}</td>
                      <td>
                        <Icon
                          style={{
                            color: "#F20574",
                            fontSize: "24px",
                            marginRight: "8px",
                          }}
                        />
                        <span>{a.state}</span>
                      </td>
                      <td>{getTime(a.datetime)}</td>
                      <td>{a.client}</td>
                      <td>
                        <span>${a.total}</span>
                        <IconButton onClick={() => setSelectedOrder(a)}>
                          <AddCircleOutlineRoundedIcon
                            style={{
                              color: "#F20574",
                              fontSize: "24px",
                            }}
                          />
                        </IconButton>
                      </td>
                      <td>
                        <ColoredButton
                          onClick={() => updateOrderState(a.id, state)}
                        >
                          {text}
                        </ColoredButton>
                        {a.state == "ACTIVE" && (
                          <IconButton
                            title="Cancelar"
                            onClick={() => {
                              toCancelOrderId.current = a.id;
                              setShowCancelForm(true);
                            }}
                          >
                            <CancelRoundedIcon sx={{ color: "#F20574" }} />
                          </IconButton>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
        {contenidoActivo === "historial" && (
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
                {historial.map((h, i) => {
                  const { Icon } =
                    NEXT_STEPS[h.state as keyof typeof NEXT_STEPS];
                  return (
                    <tr key={i}>
                      <td>{getID(h.id)}</td>
                      <td>
                        <Icon
                          style={{
                            color: "#F20574",
                            fontSize: "24px",
                            marginRight: "8px",
                          }}
                        />
                        <span>{h.state}</span>
                      </td>
                      <td>
                        {isToday(h.datetime)
                          ? "Hoy"
                          : new Date(h.datetime).toLocaleDateString()}
                      </td>
                      <td>{getTime(h.datetime)}</td>
                      <td>{h.client}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span>${h.total}</span>
                          <IconButton onClick={() => setSelectedOrder(h)}>
                            <AddCircleOutlineRoundedIcon
                              style={{
                                color: "#F20574",
                                fontSize: "24px",
                              }}
                            />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}

        <Modal
          show={selectedOrder != undefined}
          onHide={() => setSelectedOrder(undefined)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header className="border-0">
            <Button
              className="border-0"
              variant="light"
              onClick={() => setSelectedOrder(undefined)}
            >
              <b>X</b>
            </Button>
          </Modal.Header>
          <Modal.Body>
            <h2>
              <span style={{ color: "#F20574", fontWeight: "bold" }}>
                Detalles de la orden{" "}
              </span>
            </h2>
            <p>ID Orden: {getID(selectedOrder?.id ?? 0)}</p>
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
                {selectedOrder &&
                  selectedOrder.details.map((d, i) => (
                    <tr key={i}>
                      <td>{d.name}</td>
                      <td>${d.price}</td>
                      <td>{d.amount}</td>
                      <td>${d.amount * d.price}</td>
                    </tr>
                  ))}
                <tr>
                  <td>Servicio</td>
                  <td>-</td>
                  <td>-</td>
                  <td>${selectedOrder?.service}</td>
                </tr>
              </tbody>
            </Table>

            <div style={{ textAlign: "end", paddingTop: "5px" }}>
              <b>Total: ${selectedOrder?.total}</b>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
      <Backdrop open={showBackdrop}>
        <CircularProgress sx={{ color: "var(--yellow)" }} />
      </Backdrop>
      <MUIModal open={showCancelForm} onClose={() => setShowCancelForm(false)}>
        <Box
          component={Paper}
          sx={{
            width: "30%",
            height: "50%",
            position: "relative",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <form
            onSubmit={handleSubmit(handleCancelFormSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              gap: 25,
              padding: "0 25px",
            }}
          >
            <h2
              style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
            >
              Cuéntale al cliente porque su pedido ha sido cancelado
            </h2>
            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  required
                  placeholder="Escribe aquí"
                  type="text"
                  rows={5}
                />
              )}
            />
            <ColoredButton color="pink" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress /> : "Cancelar"}
            </ColoredButton>
          </form>
        </Box>
      </MUIModal>
    </div>
  );
}
