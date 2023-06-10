import React, { useState } from "react";
import { Paper, Grid, Container } from "@mui/material";
import Signup from "./Signup";
import Sidecomp from "./Sidecomp";
import Login from "./Login";
const Main = () => {
  let [page, setPage] = useState(true);

  return (
    <React.Fragment>
      <Container
        maxWidth="xl lg sm xs"
        sx={{
          bgcolor: "#FDFF91FF",
          height: "100vh",
          position: "absolute",
          padding: "0px",
        }}
      >
        <Grid container height={"80vh"} sx={{ margin: "5rem auto" }}>
          <Grid item lg={6} md={6} sm={6} component={Paper}>
            {page ? <Login /> : <Signup />}
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            component={Paper}
            sx={{ backgroundColor: "#D6A211FF" }}
          >
            <Sidecomp setPage={setPage} page={page} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Main;
