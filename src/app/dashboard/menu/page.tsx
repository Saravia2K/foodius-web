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
import { Box, IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import unmasrosa from "@/assets/images/anadir.png";
import { API_URL } from "@/utils/consts";
import { toast } from "react-toastify";

type TCategory = {
  id: number;
  name: string;
  description: string;
};
export default function MenuPage() {
  const { businessLogged } = useSession();
  const { food, reloadFood } = useBusinessFood(businessLogged?.id ?? 0);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductFormDrawer, setShowProductFormDrawer] = useState(false);
  const [foodToEdit, setFoodToEdit] = useState<TFood>();
  const [categoryToEdit, setCategoryToEdit] = useState<TCategory>();

  const handleEditFood = (f: TFood) => {
    setFoodToEdit(f);
    setShowProductFormDrawer(true);
  };

  const handleEditCategory = (c: TCategory) => {
    setCategoryToEdit(c);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = async (id: number) => {
    const fetchRes = await fetch(`${API_URL}/foodCategories/${id}`, {
      method: "DELETE",
    });

    if (fetchRes.ok) {
      await reloadFood();
    }

    const message = fetchRes.ok
      ? "Categoria eliminada exitosamente"
      : "Error al eliminar la categoria";
    toast(message, {
      type: fetchRes.ok ? "success" : "error",
    });
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
          <NewCategoryForm
            onCreated={() => setShowCategoryForm(false)}
            category={categoryToEdit}
          />
        </Drawer>
      </div>

      {food &&
        Object.entries(food).map(([id, f]) => (
          <Fragment key={id}>
            <Box
              borderBottom="0.5px solid #000"
              mt={5}
              display="flex"
              justifyContent="space-between"
            >
              <h2>{f.name}</h2>
              <div className="buttons">
                <IconButton
                  onClick={() => handleEditCategory({ id: +id, ...f })}
                >
                  <EditRoundedIcon
                    sx={{ color: "var(--yellow)", fontSize: 40 }}
                  />
                </IconButton>
                <IconButton onClick={() => handleDeleteCategory(+id)}>
                  <DeleteRoundedIcon
                    sx={{ color: "var(--pink)", fontSize: 40 }}
                  />
                </IconButton>
              </div>
            </Box>

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
