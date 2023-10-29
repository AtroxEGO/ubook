import { Box, Container, Typography } from "@mui/material";
import React from "react";
import image from "../assets/404.svg";

const Page404 = () => {
  return (
    <Container
      component="main"
      //   maxWidth="md"
      sx={{
        height: "100vh",
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "390px",
      }}>
      <Box
        sx={{ pt: 8 }}
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Typography
          component="h1"
          variant="h2">
          404 Page
        </Typography>
      </Box>
    </Container>
  );
};

export default Page404;
