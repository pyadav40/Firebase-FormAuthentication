import React from "react";
import { Paper, Box, TextField, Typography, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
const Compform = () => {
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleSubmit = async (values, e) => {
    const { email, password } = values;

    let res = await fetch(
      "https://reactformdata-ae3fa-default-rtdb.firebaseio.com/mydata.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    if (res) {
      alert("Info Submitted");
    }
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#b000d399",
        display: "fixed",
      }}
    >
      <Paper
        sx={{
          width: "70%",
          height: "80%",
          backgroundColor: "#29F269BA",
          margin: "20px auto",
          // display: "flex",
        }}
      >
        <Box sx={{ margin: "20px auto", padding: "20px" }}>
          <Typography variant="h4">Login Form</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form>
                <Field
                  as={TextField}
                  sx={{ margin: "20px auto" }}
                  type="email"
                  // value={user.email}
                  label="Email"
                  fullWidth
                  required
                  name="email"
                  error={!!(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  sx={{ margin: "20px auto" }}
                  type="password"
                  label="Password"
                  fullWidth
                  required
                  name="password"
                  error={!!(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Box>
                  <Button variant="contained" color="warning" type="submit">
                    Login
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
};

export default Compform;
