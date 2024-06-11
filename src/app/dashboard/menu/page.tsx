"use client";

import { Fragment, useState } from "react";
import ColoredButton from "@/components/ColoredButton";
import Image from "next/image";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Input from "@/components/Input";
import TextField from "@mui/material/TextField";
import useBusinessFood from "@/hooks/useBussinessFood";
import useSession from "@/hooks/useSession";
import DashboardFoodRow from "@/components/DashboardFoodRow";

import unmasrosa from "@/assets/images/anadir.png";
import NewProductForm from "./NewProductForm";
import NewCategoryForm from "./NewCategoryForm";

export default function MenuPage() {
  const { businessLogged } = useSession();
  const { food } = useBusinessFood(businessLogged?.id ?? 0);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductFormDrawer, setShowProductFormDrawer] = useState(false);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div>
              <h4>
                <strong>Nombre del negocio</strong>
              </h4>
              <h5>direccion del negocio</h5>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 style={{ color: "#F20574" }} className="mt-5">
          {" "}
          <strong>Administrador de Menú</strong>
        </h1>
      </div>

      <div className="mt-5">
        <button
          className="hover-glow"
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={() => setShowProductFormDrawer(true)}
        >
          <Image
            src={unmasrosa}
            alt="mas"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "0px",
              marginRight: "15px",
            }}
          />
          Agregar producto
        </button>
        <Drawer
          open={showProductFormDrawer}
          onClose={() => setShowProductFormDrawer(false)}
        >
          <NewProductForm onCreated={() => setShowProductFormDrawer(false)} />
        </Drawer>
      </div>
      <div className="mt-3">
        <button
          className="hover-glow"
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={() => setShowCategoryForm(true)}
        >
          <Image
            src={unmasrosa}
            alt="mas"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "0px",
              marginRight: "15px",
            }}
          />
          Agregar Categoria
        </button>
        <Drawer
          open={showCategoryForm}
          onClose={() => setShowCategoryForm(false)}
        >
          <NewCategoryForm onCreated={() => setShowCategoryForm(false)} />
        </Drawer>
      </div>

      {food &&
        Object.entries(food).map(([id, f]) => (
          <Fragment key={id}>
            <div className="border-bottom mt-5">
              <h2>{f.name}</h2>
            </div>

            <div className="border-bottom mt-4 mb-4">
              <div className="container mb-4">
                {f.dishes.map((d) => (
                  <DashboardFoodRow key={d.id} food={d} />
                ))}
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  );
}
