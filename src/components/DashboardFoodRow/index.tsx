import useBusiness, { TFood } from "@/hooks/useBusiness";
import { API_URL } from "@/utils/consts";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Image from "next/image";

import edit from "@/assets/images/boligrafo (1).png";
import eliminar from "@/assets/images/eliminar.png";
import useSession from "@/hooks/useSession";
import useBusinessFood from "@/hooks/useBussinessFood";
import { changeFoodAviability, deleteFood } from "@/services/food.service";
import { toast } from "react-toastify";

export default function DashboardFoodRow({ food }: TProps) {
  const { businessLogged } = useSession();
  const { reloadFood } = useBusinessFood(businessLogged?.id ?? 0);

  const handleStateChange = async (v: number) => {
    const updated = await changeFoodAviability(food.id, !!v);
    if (updated) reloadFood();

    const message = updated
      ? "Dispinibilidad actualizada con éxito"
      : "Error cambiar la disponibilidad";
    toast(message, {
      type: updated ? "success" : "error",
    });
  };

  const handleDeleteBtnClick = async () => {
    const deleted = await deleteFood(food.id);
    if (deleted) reloadFood();

    const message = deleted
      ? "Comida eliminada con éxito"
      : "Error al eliminar la comida";
    toast(message, {
      type: deleted ? "success" : "error",
    });
  };

  return (
    <div className="row mt-4">
      <div className="col-sm-6">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <Image
                src={`${API_URL}/${food.img_url}`}
                alt="mas"
                width={120}
                height={120}
                style={{
                  borderRadius: "0px",
                  marginRight: "15px",
                }}
              />
              <strong style={{ marginLeft: "15px", fontSize: "15px" }}>
                {food.name}
              </strong>
            </div>

            <div className="col-sm-4 d-flex justify-content-center align-items-center">
              <h3>${food.price}</h3>
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
                  defaultValue={+food.is_available}
                  name="radio-buttons-group"
                  onChange={(_, v) => handleStateChange(+v)}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Disponible"
                    style={{ color: "#9DCD5A" }}
                  />
                  <FormControlLabel
                    value={0}
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
                      onClick={handleDeleteBtnClick}
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

type TProps = {
  food: TFood;
};
