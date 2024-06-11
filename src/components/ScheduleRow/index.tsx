import { useState } from "react";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Button, Col, Row } from "react-bootstrap";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";

import styles from "./styles.module.scss";
import { TSchedule } from "@/utils/types";
import dayjs from "dayjs";
import { deleteSchedule, updateSchedule } from "@/services/schedules.service";
import useSchedules from "@/hooks/useSchedules";
import useSession from "@/hooks/useSession";
import { toast } from "react-toastify";

export default function ScheduleRow({ schedule }: TProps) {
  const { businessLogged } = useSession();
  const { reloadSchedules } = useSchedules(businessLogged?.id ?? 0);
  const [from, setFrom] = useState(new Date(schedule.from));
  const [to, setTo] = useState(new Date(schedule.to));
  const [showBackdrop, setShowBackdrop] = useState(false);

  const handleUpdateBtn = async () => {
    setShowBackdrop(true);

    const updated = await updateSchedule(schedule.id, from, to);
    if (updated) {
      await reloadSchedules();
    }

    const message = updated
      ? "Horario actualizado con éxito"
      : "Error al actualizar el horario";
    const type = updated ? "success" : "error";
    toast(message, { type });

    setShowBackdrop(false);
  };

  const handleDeleteBtn = async () => {
    setShowBackdrop(true);

    const deleted = await deleteSchedule(schedule.id);
    if (deleted) {
      await reloadSchedules();
    }

    const message = deleted
      ? "Horario eliminado con éxito"
      : "Error al eliminar el horario";
    const type = deleted ? "success" : "error";
    toast(message, { type });

    setShowBackdrop(false);
  };

  return (
    <Row>
      <Col md={4}>
        <TextField
          disabled
          fullWidth
          sx={{ backgroundColor: "#F5EFEF" }}
          id="outlined-disabled"
          defaultValue={schedule.day}
        />
      </Col>
      <Col md={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            value={dayjs(from)}
            onChange={(v) => setFrom(v?.toDate() || new Date(schedule.from))}
          />
        </LocalizationProvider>
      </Col>
      <Col md={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            value={dayjs(to)}
            onChange={(v) => setTo(v?.toDate() || new Date(schedule.to))}
            minTime={dayjs(from)}
          />
        </LocalizationProvider>
      </Col>
      <Col md={4} className="d-flex align-items-center justify-content-center">
        <div className={styles["button-container"]}>
          <Button
            variant="contained"
            className={styles["button-edit"]}
            onClick={handleUpdateBtn}
          >
            <SaveAsRoundedIcon />
          </Button>
          <Button
            variant="contained"
            className={styles["button-delete"]}
            onClick={handleDeleteBtn}
          >
            <DeleteRoundedIcon />
          </Button>
        </div>
      </Col>
      <Backdrop open={showBackdrop}>
        <CircularProgress sx={{ color: "var(--yellow)" }} />
      </Backdrop>
    </Row>
  );
}

type TProps = {
  schedule: TSchedule;
};
