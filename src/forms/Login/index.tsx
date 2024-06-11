"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next-nprogress-bar";

import FormModal from "@/components/FormModal";
import Input from "@/components/Input";
import ColoredButton from "@/components/ColoredButton";
import { TFormInput, TProps } from "./types";

import useSession from "@/hooks/useSession";

import { login as userLogin } from "@/services/users.service";
import { checkLogin, setCookie } from "@/services/system.service";
import { login as businessLogin } from "@/services/businesses.service";

export default function Login({ open, onClose }: TProps) {
  const router = useRouter();
  const session = useSession();
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<TFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormInput> = async (data) => {
    setError("");

    const loginType = await checkLogin(data.email);
    if (loginType != "business" && loginType != "user") {
      return setError("Credenciales Incorrectas");
    }

    if (loginType == "user") {
      const loginRes = await userLogin(data.email, data.password);
      if (!loginRes.response.ok) {
        setError(loginRes.data.message);
        return;
      }
      await setCookie("user", JSON.stringify(loginRes.data.user));
      session.loginUser(loginRes.data.user);
    } else {
      const login = await businessLogin(data.email, data.password);
      if ("message" in login) {
        return setError(login.message);
      }
      await setCookie("business", JSON.stringify(login));
      session.loginBusiness(login);
    }

    onClose();
    reset();
    router.push(loginType == "user" ? "/negocios" : "/dashboard");
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
        <ColoredButton
          type="submit"
          style={{
            margin: "auto",
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress color="primary" size="30px" />
          ) : (
            "Iniciar Sesión"
          )}
        </ColoredButton>
      </form>
    </FormModal>
  );
}
