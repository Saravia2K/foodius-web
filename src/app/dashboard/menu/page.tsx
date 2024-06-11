"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Drawer from "@mui/material/Drawer";
import useBusinessFood from "@/hooks/useBussinessFood";
import useSession from "@/hooks/useSession";
import DashboardFoodRow from "@/components/DashboardFoodRow";
import NewProductForm from "./NewProductForm";
import NewCategoryForm from "./NewCategoryForm";
import { TFood } from "@/hooks/useBusiness";

import unmasrosa from "@/assets/images/anadir.png";

export default function MenuPage() {
  const { businessLogged } = useSession();
  const { food } = useBusinessFood(businessLogged?.id ?? 0);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductFormDrawer, setShowProductFormDrawer] = useState(false);
  const [foodToEdit, setFoodToEdit] = useState<TFood>();

  const handleEditFood = (f: TFood) => {
    setFoodToEdit(f);
    setShowProductFormDrawer(true);
  };

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
          onClose={() => {
            setShowProductFormDrawer(false);
            setFoodToEdit(undefined);
          }}
        >
          <NewProductForm
            onCreated={() => setShowProductFormDrawer(false)}
            food={foodToEdit}
          />
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
                  <DashboardFoodRow
                    key={d.id}
                    food={d}
                    onEdit={handleEditFood}
                  />
                ))}
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  );
}
