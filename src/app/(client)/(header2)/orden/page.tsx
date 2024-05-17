"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

import ColoredButton from "@/components/ColoredButton";

import useShoppingCart from "@/hooks/useShoppingCart";
import useSession from "@/hooks/useSession";

import { API_URL } from "@/utils/consts";
import { DELIVERY_METHODS } from "@/utils/enums";

import { createOrder } from "@/services/orders.service";

export default function Orden() {
  const [total, setTotal] = useState(0);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const router = useRouter();
  const session = useSession();
  const { foods } = useShoppingCart();

  useEffect(() => {
    setTotal(foods.reduce((prev, curr) => prev + +curr.price * curr.amount, 0));
  }, [foods]);

  async function handleOrderHereClick() {
    setOpenBackdrop(true);
    const token = await createOrder({
      id_user: session.userLogged!.id,
      date: new Date(),
      delivery_method: DELIVERY_METHODS.HOME_DELIVERY,
    });

    if (token == undefined) {
      toast("Error tratando de crear la orden", {
        type: "error",
      });
      setOpenBackdrop(false);
      return;
    }

    router.push(`/orden/${token}`);
  }

  return (
    <div>
      <div style={{ backgroundColor: "#FFEFEA" }}>
        <div className="container-fluid">
          <div className="row d-flex">
            <div className="col-sm-8 py-5 px-5">
              <div className="card rounded-5 border-0">
                <div className="card-body">
                  <h4 className="card-title border-bottom py-3">
                    Detalle del usuario
                  </h4>
                  <form>
                    <div className="mb-3 py-4">
                      <label htmlFor="fullName" className="form-label fw-bold">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-5"
                        id="fullName"
                        placeholder="Ingresa tu nombre completo"
                        value={`${session.userLogged?.names} ${session.userLogged?.last_names}`}
                        disabled
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label fw-bold">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            className="form-control rounded-5"
                            id="email"
                            placeholder="nombre@ejemplo.com"
                            value={session.userLogged?.email}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label fw-bold">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            className="form-control rounded-5"
                            id="phone"
                            placeholder="Ingresa tu número de teléfono"
                            value={session.userLogged?.phone_number}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </form>

                  <h4 className="card-title border-bottom py-4">
                    Detalle de la orden
                  </h4>

                  <div className="row">
                    <div className="col">
                      <h6 className="card-title fw-bold py-3">Metodo: </h6>
                    </div>
                    <div className="col">
                      <h6 className="card-title fw-bold py-3">Pick-up</h6>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <h6 className="card-title fw-bold py-3">Sub total: </h6>
                    </div>
                    <div className="col">
                      <h6 className="card-title py-3">${total}</h6>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <h6 className="card-title fw-bold py-3">
                        Cobro por servicio:{" "}
                      </h6>
                    </div>
                    <div className="col">
                      <h6 className="card-title py-3">
                        ${Math.round(total * 0.15 * 100) / 100}
                      </h6>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <h6 className="card-title fw-bold py-3">total: </h6>
                    </div>
                    <div className="col">
                      <h6
                        className="card-title py-3"
                        style={{ color: "#F20574" }}
                      >
                        ${Math.round(total * 1.15 * 100) / 100}
                      </h6>
                    </div>
                  </div>

                  <h4 className="card-title border-bottom py-4">
                    Metodo de pago
                  </h4>

                  <ColoredButton color="yellow">
                    Pago contra entrega
                  </ColoredButton>
                </div>
              </div>
            </div>
            <div className="col-sm-4 py-5">
              <div className="card rounded-5 border-0">
                <div className="card-body">
                  <h4 className="card-title border-bottom py-4">Resumen</h4>
                  {(foods || []).map((f, i) => (
                    <div
                      key={i}
                      className="card mb-3"
                      style={{ maxWidth: "540px" }}
                    >
                      <div className="row g-0 align-items-center">
                        <div className="col-md-4 rounded-3">
                          <Image
                            src={`${API_URL}/static/foods/${f.img_url}`}
                            width={200}
                            height={200}
                            alt="Delicious pasta"
                            className="img-fluid rounded p-3"
                            style={{ maxWidth: "100%" }}
                          />
                        </div>

                        <div className="col-md-8">
                          <div key={i} className="card-body">
                            <h5 className="card-title">{f.name}</h5>
                            <div className="row">
                              <div className="col">
                                <h6 className="card-title py-2">Cantidad: </h6>
                              </div>
                              <div className="col">
                                <h6 className="card-title fw-bold py-2">
                                  {f.amount}
                                </h6>
                              </div>
                            </div>
                            <h6
                              className="text-danger "
                              style={{ color: "#F20574" }}
                            >
                              ${f.price} unidad - ${+f.price * f.amount} total
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row container">
                  <div className="col text-end">
                    <h6 className="py-3 fw-bold">Total: ${total}</h6>
                  </div>
                </div>
                <ColoredButton
                  color="pink"
                  sx={{
                    margin: "auto",
                    marginBottom: 3,
                  }}
                  onClick={handleOrderHereClick}
                >
                  Ordena aqui!
                </ColoredButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Backdrop open={openBackdrop}>
        <CircularProgress sx={{ color: "var(--yellow)" }} />
      </Backdrop>
    </div>
  );
}
