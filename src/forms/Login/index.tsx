"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

import { login } from "@/services/users.service";
import FormModal from "@/components/FormModal";
import Input from "@/components/Input";
import ColoredButton from "@/components/ColoredButton";
import { TFormInput, TProps } from "./types";
import useSession from "@/hooks/useSession";

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
    const loginRes = await login(data.email, data.password);
    if (!loginRes.response.ok) {
      setError(loginRes.data.message);
      return;
    }

    onClose();
    reset();
    session.login(loginRes.data.user);
    router.push("/negocios");
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
