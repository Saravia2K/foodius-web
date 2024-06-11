"use client";
import ColoredButton from "@/components/ColoredButton";
import Image from "next/image";
import unmasrosa from "@/assets/images/anadir.png";
import edit from "@/assets/images/boligrafo (1).png";
import eliminar from "@/assets/images/eliminar.png";

import nuegados from "@/assets/images/NUÉGADO-DE-YUCA-TIPICOS-MARGOTH.jpg";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import Typography from "@mui/material/Typography";

import DialogContent from "@mui/material/DialogContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";

import Drawer from "@mui/material/Drawer";

import React, { useState } from "react";

import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";

import Input from "@/components/Input";

import TextField from "@mui/material/TextField";

export default function MenuPage() {
  //dialog

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //drawer

  const [otherOpen, setOtherOpen] = React.useState(false);

  const handleClickOpendrawer = () => {
    setOtherOpen(true);
  };

  const handleClosedrawer = () => {
    setOtherOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOtherOpen(newOpen);
  };

  //drawer2

  const [otherOpen2, setOtherOpen2] = React.useState(false);

  const handleClickOpendrawer2 = () => {
    setOtherOpen2(true);
  };

  const handleClosedrawer2 = () => {
    setOtherOpen2(false);
  };

  const toggleDrawer2 = (newOpen: boolean) => () => {
    setOtherOpen2(newOpen);
  };

  //drawer3

  const [otherOpen3, setOtherOpen3] = React.useState(false);

  const handleClickOpendrawer3 = () => {
    setOtherOpen3(true);
  };

  const handleClosedrawer3 = () => {
    setOtherOpen3(false);
  };

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

  const NuevoProducto = (
    <Box sx={{ width: 600 }} role="presentation">
      <div className="m-4">
        <h5>Producto</h5>

        <div className="d-flex justify-content-between border-bottom mt-4">
          <h1 style={{ color: "#F20574" }}>Nuevo Producto</h1>
          <div className="d-flex justify-content-between">
            <CheckCircleIcon style={{ color: green[500], marginRight: 10 }} />
            <Typography>Disponible</Typography>
          </div>
        </div>

        <div className="mt-5">
          <Input title="Nombre Producto" placeholder="Obligatorio"></Input>
          <div className="d-flex justify-content-between mt-5">
            <Input title="Precio" placeholder="Obligatorio"></Input>
            <Input title="Tarifa Extra" placeholder="opcional"></Input>
          </div>

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
          <div className="btn-group w-100 mt-5">
            <button
              type="button"
              className="btn btn-danger dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Antojitos
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Separated link
              </a>
            </div>
          </div>
        </div>
      </div>

      <Divider />
      <center>
        <div d-flex bottom-content mt-6>
          <input type="file" />
        </div>
      </center>

      <div className="d-flex bottom-content mt-5">
        <div className="container">
          <div className="row">
            <div className="bottom-content col-md-6">
              <ColoredButton color="yellow">Cancelar</ColoredButton>
            </div>
            <div className="bottom-content col-md-6">
              <ColoredButton color="pink">Guardar cambios</ColoredButton>
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
          onClick={toggleDrawer2(true)}
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
        <Drawer open={otherOpen2} onClose={toggleDrawer2(false)}>
          {NuevoProducto}
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

      <div className="border-bottom mt-5">
        <h2>Antojitos</h2>
      </div>

      <div className="border-bottom mt-4 mb-4">
        <div className="container mb-4">
          <div className="row">
            <div className="col-sm-6">
              <div className="container">
                <div className="row">
                  <div className="col-sm-8">
                    <Image
                      src={nuegados}
                      alt="mas"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "0px",
                        marginRight: "15px",
                      }}
                    />
                    <strong style={{ marginLeft: "15px", fontSize: "20px" }}>
                      Nuegados
                    </strong>
                  </div>

                  <div className="col-sm-4 d-flex justify-content-center align-items-center">
                    <h3>US $2.00</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6 d-flex justify-content-center align-items-center">
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Disponible"
                          control={<Radio />}
                          label="Disponible"
                          style={{ color: "#9DCD5A" }}
                        />
                        <FormControlLabel
                          value="No Disponible"
                          control={<Radio />}
                          label="No Disponible"
                          style={{ color: "#F20574" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="col-sm-6 d-flex justify-content-center align-items-center">
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-6">
                          <button
                            className="hover-glow"
                            style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                          >
                            <Image
                              src={edit}
                              alt="mas"
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "0px",
                                marginRight: "15px",
                              }}
                            />
                          </button>
                        </div>
                        <div className="col-sm-6">
                          <button
                            className="hover-glow"
                            style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                            onClick={handleClickOpen}
                          >
                            <Image
                              src={eliminar}
                              alt="mas"
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "0px",
                                marginRight: "15px",
                              }}
                            />
                          </button>
                          <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Acción completada</DialogTitle>
                            <DialogContent
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <CheckCircleIcon
                                style={{ color: green[500], marginRight: 10 }}
                              />
                              <Typography>Eliminado correctamente</Typography>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
