import React from "react";
import { Box, Button, Typography, Container } from "@material-ui/core";

const ErrorPage = () => {
  const goHome = () => {
    window.location.href = "/"; // Using native browser navigation to the home page
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h1"
          sx={{ fontSize: "120px", fontWeight: 700, color: "#FF6F61" }}
        >
          404
        </Typography>
        <Typography
          variant="h6"
          sx={{ marginBottom: 3, fontWeight: 500, color: "#666" }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={goHome}
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: "16px",
            padding: "12px 30px",
            borderRadius: "30px",
            "&:hover": {
              backgroundColor: "#e04e3d",
            },
          }}
        >
          Go Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
