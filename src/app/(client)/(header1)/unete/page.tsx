"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ColoredButton from "@/components/ColoredButton";
import Image from "next/image";
import graficas from "../../../../assets/images/grffoodius.png";
import Dropzone from "@/components/Dropzone";
import { Alert, CircularProgress, Snackbar, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createBusiness } from "@/services/businesses.service";
import { useRouter } from "next-nprogress-bar";
import useSession from "@/hooks/useSession";
import { toast } from "react-toastify";

type TFormFields = {
  name: string;
  email: string;
  phone_number: string;
  location: string;
  password: string;
};

export default function UnetePage() {
  const { loginBusiness } = useSession();
  const [logo, setLogo] = useState<File>();
  const [banner, setBanner] = useState<File>();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFormFields>({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      location: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormFields> = async (data) => {
    if (!logo || !banner) return setShowSnackbar(true);

    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("email", data.email);
    fd.append("phone_number", data.phone_number);
    fd.append("location", data.location);
    fd.append("password", data.password);
    fd.append("logo", logo);
    fd.append("banner", banner);

    const { statusCode, business } = await createBusiness(fd);

    if (statusCode == 201) {
      loginBusiness(business!);
      router.push("/bienvenido");
      return;
    }

    toast(business.message, {
      type: "error",
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="p-3">
              <center>
                <h1 style={{ fontSize: "100px", marginTop: "120px" }}>
                  <strong>Se parte de</strong>
                </h1>
              </center>
              <center>
                <h1 style={{ color: "#F20574", fontSize: "120px" }}>
                  <strong>#Foodius</strong>
                </h1>
              </center>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3">
              <div className="card rounded-5 border-0  p-3">
                <div className="card-body">
                  <h6 className="card-title border-bottom py-4">
                    Asociate a foodius para impulsar el crecimiento y llevar tus{" "}
                    <strong style={{ color: "#F20574" }}>
                      Antojitos a un nuevo nivel.
                    </strong>
                  </h6>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        {...field}
                        required
                        title="Nombre del negocio"
                        placeholder="ingrese el nombre"
                        type="text"
                        style={{ margin: "10px", padding: "10px" }}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="location"
                    render={({ field }) => (
                      <Input
                        {...field}
                        required
                        title="Ubicacion del negocio"
                        placeholder="Departamento / ciudad"
                        type="text"
                        style={{ margin: "10px", padding: "10px" }}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        {...field}
                        required
                        title="Correo electronico"
                        placeholder="example@gmail.com"
                        type="email"
                        style={{ margin: "10px", padding: "10px" }}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="phone_number"
                    render={({ field: { onChange, ...field } }) => (
                      <Input
                        {...field}
                        required
                        title="Telefono comercial"
                        placeholder="xxxxxxxx"
                        type="text"
                        style={{ margin: "10px", padding: "10px" }}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (isNaN(+val) || val.length > 8) return;

                          onChange(val);
                        }}
                      />
                    )}
                  />

                  <div>
                    <Typography
                      fontFamily="inherit"
                      fontWeight="bold"
                      color="#f20574"
                      marginBottom={1}
                    >
                      Logo
                    </Typography>
                    <Dropzone onDrop={setLogo} />
                  </div>

                  <div>
                    <Typography
                      fontFamily="inherit"
                      fontWeight="bold"
                      color="#f20574"
                      marginBottom={1}
                    >
                      Banner
                    </Typography>
                    <Dropzone onDrop={setBanner} />
                  </div>

                  <ColoredButton
                    color="pink"
                    style={{ margin: "20px", padding: "10px" }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress /> : "Registrar negocio"}
                  </ColoredButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-white py-5">
        <center>
          <h1 style={{ fontSize: "80px", marginTop: "60px" }}>
            <strong>Unete a </strong>{" "}
            <strong style={{ color: "#F20574" }}>#Foodius </strong>{" "}
            <strong> y despierta el hambre de nuevos clientes</strong>
          </h1>
        </center>

        <div className="row">
          <div className="col-md-6 mt-5 py-5">
            <center>
              <h1
                style={{ fontSize: "35px", marginTop: "40px", margin: "40px" }}
              >
                <strong>Brilla en el </strong>{" "}
                <strong style={{ color: "#F20574" }}>Menu Digital </strong>{" "}
                <strong> : Aumenta tu Visibilidad con foodius</strong>
              </h1>
            </center>
            <center>
              <p style={{ margin: "40px" }}>
                Al unirte a foodius, tu restaurante o negocio ganara visibilidad
                y alcanzara a una amplia audiencia de clientes potenciales que
                buscan opciones gastronomicas locales.
              </p>
            </center>
          </div>

          <div className="col-md-6 py-5">
            <center>
              <Image
                src={graficas}
                alt="grafica"
                style={{ width: "400px", height: "400px" }}
              />
            </center>
          </div>
        </div>
      </div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
          onClose={() => setShowSnackbar(false)}
        >
          El logo y el banner son obligatorios
        </Alert>
      </Snackbar>
    </div>
  );
}
