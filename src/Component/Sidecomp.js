import { Typography, Box, Button } from "@mui/material";
import React from "react";

const Sidecomp = ({ setPage, page }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="h3" sx={{ marginY: 2 }}>
        Welcome!
      </Typography>
      <Typography variant="h5" sx={{ marginY: 2 }}>
        {page ? "Don't have an account?" : "Please Login"}
      </Typography>

      <Button
        disableRipple
        variant="contained"
        color="warning"
        onClick={() => {
          setPage(!page);
        }}
        sx={{ marginY: 2 }}
      >
        {`${page ? "Sign Up" : "Login"}`}
      </Button>
    </Box>
  );
};

export default Sidecomp;
