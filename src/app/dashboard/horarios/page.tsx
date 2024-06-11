"use client";

import { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Image from "next/image";
import watchImg from "@/assets/images/watch.svg";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import ColoredButton from "@/components/ColoredButton";
import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { addSchedule } from "@/services/schedules.service";
import useSession from "@/hooks/useSession";
import { toast } from "react-toastify";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import useSchedules from "@/hooks/useSchedules";
import ScheduleRow from "@/components/ScheduleRow";
import { TSchedule } from "@/utils/types";

type TFormFields = {
  day: string;
  from: Date;
  to: Date;
};
export default function HorariosPage() {
  const { businessLogged } = useSession();
  const { schedules, reloadSchedules } = useSchedules(businessLogged?.id ?? 0);
  const [showBackdrop, setShowBackgrop] = useState(false);
  const [allowedDays, setAllowedDays] = useState<string[]>([]);

  useEffect(() => {
    if (!schedules) return;

    const usedDays = schedules.map((s) => s.day);
    setAllowedDays(DAYS.filter((d) => usedDays.indexOf(d) == -1));
  }, [schedules]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
    reset,
  } = useForm<TFormFields>({
    defaultValues: {
      day: "",
      from: new Date(new Date().setHours(8, 0, 0, 0)),
      to: new Date(new Date().setHours(19, 0, 0, 0)),
    },
  });
  const from = watch("from");

  const handleFormSubmit: SubmitHandler<TFormFields> = async (data) => {
    setShowBackgrop(true);

    const added = await addSchedule(
      businessLogged!.id,
      data.day,
      data.from,
      data.to
    );

    if (added) {
      await reloadSchedules();
      reset();
    }

    const message = added
      ? "Horario agregado con éxito"
      : "Error al agregar el horario";
    const type = added ? "success" : "error";
    toast(message, { type });

    setShowBackgrop(false);
  };

  function sortDataByDay(data: TSchedule[]) {
    return data.sort((a, b) => {
      return DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
    });
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <h1
          style={{ fontSize: "60px", color: "var(--pink)", fontWeight: "bold" }}
          className="pe-3"
        >
          Horarios
        </h1>
        <Image src={watchImg} alt="reloj" width={50} />
      </div>

      {allowedDays.length && (
        <div className="py-5">
          <p>
            Selecciona un{" "}
            <span style={{ color: "var(--yellow)" }}>nuevo horario</span> para
            tu negocio
          </p>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="d-flex align-items-center">
              <Col md={4}>
                <Controller
                  control={control}
                  name="day"
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      fullWidth
                      disablePortal
                      id="combo-box-demo"
                      options={allowedDays.map((d) => ({
                        label: d,
                        value: d,
                      }))}
                      onChange={(_, value) => onChange(value?.value)}
                      value={{
                        label: field.value,
                        value: field.value,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...field}
                          required
                          label="Días de la Semana"
                        />
                      )}
                    />
                  )}
                />
              </Col>
              <Col md={2}>
                <Controller
                  control={control}
                  name="from"
                  render={({ field: { value, onChange } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileTimePicker
                        label={"Hora de Apertura"}
                        value={dayjs(value)}
                        onChange={(v) => onChange(v?.toDate())}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Col>

              <Col md={2}>
                <Controller
                  control={control}
                  name="to"
                  render={({ field: { value, onChange } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileTimePicker
                        label={"Hora de Cierre"}
                        value={dayjs(value)}
                        onChange={(v) => onChange(v?.toDate())}
                        minTime={dayjs(from)}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Col>

              <Col md={4} className="text-center">
                <ColoredButton fullWidth type="submit" disabled={isSubmitting}>
                  Agregar Día
                </ColoredButton>
              </Col>
            </Row>
          </form>
        </div>
      )}

      <Box display="flex" flexDirection="column" gap={3}>
        {sortDataByDay(schedules || []).map((s) => (
          <ScheduleRow key={s.day} schedule={s} />
        ))}
      </Box>
      <Backdrop open={showBackdrop}>
        <CircularProgress sx={{ color: "var(--yellow)" }} />
      </Backdrop>
    </div>
  );
}

const DAYS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
