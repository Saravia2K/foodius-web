import { useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Snackbar,
  TextField,
} from "@mui/material";
import Input from "@/components/Input";
import ColoredButton from "@/components/ColoredButton";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useSession from "@/hooks/useSession";
import useBusinessFood from "@/hooks/useBussinessFood";
import Select from "@/components/Select";
import { createFood, updateFood } from "@/services/food.service";
import { toast } from "react-toastify";
import { TFood } from "@/hooks/useBusiness";
import Dropzone from "@/components/Dropzone";

type TFormFields = {
  id_food_category: number;
  name: string;
  description: string;
  price: number;
};
export default function NewProductForm({ onCreated, food: foodInfo }: TProps) {
  const { businessLogged } = useSession();
  const { food, reloadFood } = useBusinessFood(businessLogged?.id ?? 0);
  const [pic, setPic] = useState<File>();
  const [showPicWarning, setShowPicWarning] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFormFields>({
    defaultValues: {
      id_food_category: foodInfo?.id_food_category ?? +Object.keys(food!)[0],
      name: foodInfo?.name ?? "",
      description: foodInfo?.description ?? "",
      price: Number(foodInfo?.price) ?? 0,
    },
  });

  const handleFormSubmit: SubmitHandler<TFormFields> = async (data) => {
    if (!pic && !foodInfo) {
      return setShowPicWarning(true);
    }

    const fd = new FormData();
    fd.append("id_food_category", `${data.id_food_category}`);
    fd.append("name", data.name);
    fd.append("description", data.description);
    fd.append("price", `${data.id_food_category}`);
    fd.append("is_available", `true`);
    if (pic) fd.append("image", pic);

    const success = foodInfo
      ? await updateFood(foodInfo.id, fd)
      : await createFood(fd);

    if (success) {
      await reloadFood();
      onCreated && onCreated();
    }

    const message = success
      ? "Producto procesado exitosamente"
      : "Error al procesar el producto";
    toast(message, {
      type: success ? "success" : "error",
    });
  };

  return (
    <Box sx={{ width: 600 }} role="presentation">
      <div className="m-4">
        <h5>Producto</h5>

        <div className="d-flex justify-content-between border-bottom mt-4">
          <h1 style={{ color: "#F20574" }}>
            {foodInfo ? "Editar" : "Nuevo"} Producto
          </h1>
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
                title="Nombre Producto"
                placeholder="Obligatorio"
              ></Input>
            )}
          />
          <div className="mt-4">
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  autoComplete="off"
                  title="Precio"
                  placeholder="Obligatorio"
                  type="number"
                ></Input>
              )}
            />
          </div>

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
                  rows={5}
                  multiline
                  color="error"
                />
              )}
            />
          </div>
          <div className="mt-5">
            <h6 style={{ color: "#F20574" }}>
              <strong>Categoría</strong>
            </h6>
            {food && (
              <Controller
                control={control}
                name="id_food_category"
                render={({ field: { value, onChange } }) => (
                  <Select
                    fullWidth
                    items={Object.entries(food).map(([id, f]) => ({
                      text: f.name,
                      value: +id,
                    }))}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{ marginTop: 1 }}
                  />
                )}
              />
            )}
          </div>
        </div>
        <Divider />

        <Dropzone onDrop={setPic} />

        <div className="d-flex bottom-content mt-5 mb-5">
          <div className="container">
            <div className="row">
              <div className="bottom-content col-md-6">
                <ColoredButton
                  color="pink"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress /> : "Guardar cambios"}
                </ColoredButton>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Snackbar
        open={showPicWarning}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={() => setShowPicWarning(false)}
      >
        <Alert
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
          onClose={() => setShowPicWarning(false)}
        >
          Debes subir una foto para crear un producto
        </Alert>
      </Snackbar>
    </Box>
  );
}

type TProps = {
  onCreated?: () => void;
  food?: TFood;
};
