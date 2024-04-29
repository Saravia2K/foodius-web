import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Grid,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";

import { signUp } from "@/services/users.service";
import FormModal from "@/components/FormModal";
import Input from "@/components/Input";
import ColoredButton from "@/components/ColoredButton";
import { TFormInput, TProps } from "./types";

export default function SignUp({ open, onClose }: TProps) {
  const [error, setError] = useState("");
  const [termsAndConditionsAcepted, setTermsAndConditionsAcepted] =
    useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<TFormInput>({
    defaultValues: {
      names: "",
      last_names: "",
      email: "",
      phone_number: "",
      password: "",
      location: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormInput> = async (data) => {
    setError("");
    const signUpRes = await signUp(data);
    if (!signUpRes.response.ok) {
      setError(signUpRes.data.message);
      return;
    }
    onClose();
    toast(
      "Usuario creado correctamente. Ahora inicia sesión para disfrutar de nuestros servicios"
    );
    reset();
    setTermsAndConditionsAcepted(false);
  };

  return (
    <FormModal open={open} onClose={onClose} error={error}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 25,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="names"
              render={({ field: { ref, ..._field } }) => (
                <Input
                  {..._field}
                  type="text"
                  title="Nombres"
                  placeholder="Nombres"
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="last_names"
              render={({ field: { ref, ..._field } }) => (
                <Input
                  {..._field}
                  type="text"
                  title="Apellidos"
                  placeholder="Apellidos"
                  required
                />
              )}
            />
          </Grid>
        </Grid>
        <Controller
          control={control}
          name="email"
          render={({ field: { ref, ..._field } }) => (
            <Input
              {..._field}
              type="email"
              title="Correo electrónico"
              placeholder="example@email.com"
              required
            />
          )}
        />
        <Controller
          control={control}
          name="phone_number"
          render={({ field: { ref, ..._field } }) => (
            <Input
              {..._field}
              type="text"
              title="Número telefónico"
              placeholder="xxxx-xxxx"
              required
              autoComplete="off"
              InputProps={{
                componentsProps: { input: { maxLength: 8 } },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { ref, ..._field } }) => (
            <Input
              {..._field}
              type="password"
              title="Contraseña"
              placeholder="••••••••••"
              required
            />
          )}
        />

        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: "var(--pink)",
                "&.Mui-checked": {
                  color: "var(--pink)",
                },
              }}
              checked={termsAndConditionsAcepted}
              onChange={(e) => setTermsAndConditionsAcepted(e.target.checked)}
            />
          }
          label='Al hacer clic en "Aceptar", confirmo que he leído y acepto los términos y condiciones del servicio.'
          componentsProps={{
            typography: { color: "var(--pink)", fontSize: 12 },
          }}
          sx={{ padding: "0 25px" }}
        />

        <ColoredButton
          type="submit"
          disabled={isSubmitting || !termsAndConditionsAcepted}
          style={{
            margin: "auto",
          }}
        >
          {isSubmitting ? (
            <CircularProgress color="primary" size="30px" />
          ) : (
            "Registrarse"
          )}
        </ColoredButton>
      </form>
    </FormModal>
  );
}
