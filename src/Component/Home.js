import React, { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Paper, Avatar, CardHeader } from "@mui/material";

const Home = () => {
  const [logUser, setLogUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoading(false);
      if (currentUser) {
        setLogUser(currentUser);
      } else {
        setLogUser(null);
        console.linfo("user Log Out");
      }
    });
    return () => unsubscribe();
  }, []);

  //Utilize optional chaining in firstSlice function: You can use optional chaining (?.)
  const firstSlice = (logUser) => {
    if (logUser) {
      const firstletter = logUser?.email?.[0]?.toUpperCase();
      return firstletter || null;
    }
  };

  const logOut = useCallback(async () => {
    await signOut(auth);
    navigate("/");
  }, [navigate]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Paper
      sx={{
        backgroundColor: "#FDFFF2FF",
        height: "5rem",
        display: "flex",
        alignItems: "center",
      }}
      elevation={2}
    >
      <Grid container direction="row">
        <Grid item lg={6} md={6} sm={6}>
          <CardHeader
            sx={{ fontSize: "2rem" }}
            avatar={
              <Avatar sx={{ bgcolor: "#410000" }}>{firstSlice(logUser)}</Avatar>
            }
            title={logUser?.email}
          />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          sx={{ justifyContent: "flex-end", display: "flex" }}
        >
          <Button
            sx={{
              height: "3rem",
              marginRight: "3rem",
              justifyContent: "flex-end",
            }}
            disableRipple
            variant="contained"
            color="warning"
            onClick={logOut}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Home;
