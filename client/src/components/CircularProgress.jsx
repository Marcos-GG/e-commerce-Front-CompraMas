import { Backdrop, Box, CircularProgress } from "@mui/material";

const Circularprogress = () => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(8px)",
      }}
      open={true}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Fondo difuminado
          borderRadius: "5px",
          width: "10rem",
          height: "5rem",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    </Backdrop>
  );
};

export default Circularprogress;
