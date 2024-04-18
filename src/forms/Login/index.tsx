import { Controller, SubmitHandler, useForm } from "react-hook-form";

import FormModal from "@/components/FormModal";
import Input from "@/components/Input";
import ColoredButton from "@/components/ColoredButton";
import { TFormInput, TProps } from "./types";

export default function Login({ open, onClose }: TProps) {
  const { control, handleSubmit } = useForm<TFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormInput> = (data) => {};

  return (
    <FormModal open={open} onClose={onClose}>
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
            />
          )}
        />
        <ColoredButton
          type="submit"
          style={{
            margin: "auto",
          }}
        >
          Iniciar Sesión
        </ColoredButton>
      </form>
    </FormModal>
  );
}
