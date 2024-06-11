import ColoredButton from "@/components/ColoredButton";
import Input from "@/components/Input";
import useBusinessFood from "@/hooks/useBussinessFood";
import useSession from "@/hooks/useSession";
import { createCategory } from "@/services/food.service";
import { Box, CircularProgress, Divider, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type TFormFields = {
  name: string;
  description: string;
};
export default function NewCategoryForm({ onCreated }: TProps) {
  const { businessLogged } = useSession();
  const { reloadFood } = useBusinessFood(businessLogged?.id ?? 0);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFormFields>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormFields> = async (data) => {
    const created = await createCategory(
      businessLogged!.id,
      data.name,
      data.description
    );
    if (created) {
      await reloadFood();
      onCreated && onCreated();
    }

    const message = created
      ? "Categoría creada exitosamente"
      : "Error al crear una categoría";
    toast(message, {
      type: created ? "success" : "error",
    });
  };

  return (
    <Box sx={{ width: 600 }} role="presentation">
      <div className="m-4">
        <h5>categoria</h5>
        <div className="border-bottom mt-4">
          <h1 style={{ color: "#F20574" }}>Nueva Categoria</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="m-4 mt-5">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                required
                autoComplete="off"
                title="Nombre Categoria"
                placeholder="Obligatorio"
              />
            )}
          />
          <div className="mt-5">
            <h6 style={{ color: "#F20574" }}>
              <strong>Descripcion</strong>
            </h6>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  id="outlined-textarea"
                  label="Descripcion"
                  placeholder="Placeholder"
                  multiline
                  rows={4}
                  color="error"
                />
              )}
            />
          </div>
        </div>
        <Divider />
        <div className="d-flex bottom-content mt-5">
          <div className="container">
            <div className="row">
              <div className="bottom-content col-md-6">
                <ColoredButton
                  color="pink"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress /> : "Guardar Cambios"}
                </ColoredButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Box>
  );
}

type TProps = {
  onCreated?: () => void;
};
