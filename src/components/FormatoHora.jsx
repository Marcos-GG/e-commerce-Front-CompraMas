/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import moment from "moment";
import "moment/locale/es";

const FormatoHora = ({ hora }) => {
  moment.locale("es");

  const customTimestamp = moment(hora);
  let formatoDeHora;

  const now = moment();
  const duration = moment.duration(now.diff(customTimestamp));

  if (duration.years() > 0) {
    formatoDeHora = "hace " + duration.years() + " años";
  } else if (duration.months() > 0) {
    formatoDeHora = "hace " + duration.months() + " meses";
  } else if (duration.days() > 0) {
    formatoDeHora = "hace " + duration.days() + " días";
  } else if (duration.hours() > 0) {
    formatoDeHora = "hace " + duration.hours() + " horas";
  } else {
    const minutes = duration.minutes();
    formatoDeHora =
      "hace " + minutes + (minutes === 1 ? " minuto" : " minutos");
  }

  return (
    <Box>
      <Typography sx={{ fontSize: "12px" }}>{formatoDeHora}</Typography>
    </Box>
  );
};

export default FormatoHora;
