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

export default function MenuPage() {
  const { businessLogged } = useSession();
  const { food } = useBusinessFood(businessLogged?.id ?? 0);

  //drawer
  const [otherOpen, setOtherOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOtherOpen(newOpen);
  };

  //drawer2
  const [showProductFormDrawer, setShowProductFormDrawer] = useState(false);

  //drawer3
  const [otherOpen3, setOtherOpen3] = useState(false);

  const toggleDrawer3 = (newOpen: boolean) => () => {
    setOtherOpen3(newOpen);
  };

  const Editarcategoria = (
    <Box sx={{ width: 600 }} role="presentation">
      <div className="m-4">
        <h5>categoria</h5>
        <div className="border-bottom mt-4">
          <h1 style={{ color: "#F20574" }}>Editar Categoria</h1>
        </div>
        <div className="mt-5">
          <Input title="Nombre Categoria" placeholder="Obligatorio"></Input>
          <div className="mt-5">
            <h6 style={{ color: "#F20574" }}>
              <strong>Descripcion</strong>
            </h6>
            <TextField
              fullWidth
              id="outlined-textarea"
              label="Descripcion"
              placeholder="Placeholder"
              multiline
              color="error"
            />{" "}
          </div>
        </div>
      </div>
      <Divider />
      <div className="d-flex bottom-content mt-5">
        <div className="container">
          <div className="row">
            <div className="bottom-content col-md-6">
              <ColoredButton color="yellow">Guardar Cambios</ColoredButton>
            </div>
            <div className="bottom-content col-md-6">
              <ColoredButton color="pink">Eliminar Categoria</ColoredButton>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );

  const NuevaCategoria = (
    <Box sx={{ width: 600 }} role="presentation">
      <div className="m-4">
        <h5>categoria</h5>
        <div className="border-bottom mt-4">
          <h1 style={{ color: "#F20574" }}>Nueva Categoria</h1>
        </div>
        <div className="mt-5">
          <Input title="Nombre Categoria" placeholder="Obligatorio"></Input>
          <div className="mt-5">
            <h6 style={{ color: "#F20574" }}>
              <strong>Descripcion</strong>
            </h6>
            <TextField
              fullWidth
              id="outlined-textarea"
              label="Descripcion"
              placeholder="Placeholder"
              multiline
              color="error"
            />{" "}
          </div>
        </div>
      </div>
      <Divider />
      <div className="d-flex bottom-content mt-5">
        <div className="container">
          <div className="row">
            <div className="bottom-content col-md-6">
              <ColoredButton color="yellow">Cancelar</ColoredButton>
            </div>
            <div className="bottom-content col-md-6">
              <ColoredButton color="pink">Guardar Cambios</ColoredButton>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );

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
          <div className="col-md-4">
            <div className="d-flex justify-content-end">
              <ColoredButton color="yellow">Usuario</ColoredButton>
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
          onClick={toggleDrawer3(true)}
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
        <Drawer open={otherOpen3} onClose={toggleDrawer3(false)}>
          {NuevaCategoria}
        </Drawer>
      </div>

      <div className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <ColoredButton color="pink">Categoria</ColoredButton>
            </div>
            <div className="col-md-3">
              <ColoredButton color="yellow" onClick={toggleDrawer(true)}>
                Editar Categoria
              </ColoredButton>
              <Drawer open={otherOpen} onClose={toggleDrawer(false)}>
                {Editarcategoria}
              </Drawer>
            </div>
          </div>
        </div>
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
