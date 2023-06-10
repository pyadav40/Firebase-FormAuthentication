import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import * as Yup from "yup";


const Signup = () => {
  const [succSignup, setSuccSignup] = useState(false);
  const [signupError, setSignupError] = useState("");

  /////------******************************    Intialied Formik Values ******************************--------------------////

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpass: "",
  };

  /////------******************************     ValidationSchema  ******************************--------------------////
  const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
    confirmpass: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null]),
  });

  /////------******************************     ValidationSchema  ******************************--------------------////

  /////------******************************    Form Values in Firebase  ******************************--------------------////

  const handleSubmit = async (values, { resetForm }) => {
    const { firstname, lastname, email, password, confirmpass } = values;
    const display_name = `${firstname} ${lastname}`;
    try {
      await createUserWithEmailAndPassword(auth, email, password, display_name);
      setSuccSignup(true);
    } catch (error) {
      setSignupError(error.message);
    }

    let res = await fetch(
      "https://reactformdata-ae3fa-default-rtdb.firebaseio.com/signup.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          confirmpass,
        }),
      }
    );
    if (res) {
      resetForm({ values: "" });
    }
  };

  /////------******************************    Form Values in Firebase  ******************************--------------------////

  return (
    <Box sx={{ margin: "10px auto", width: "80%" }}>
      <Typography variant="h4">Sign Up Form</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <Field
              as={TextField}
              sx={{ margin: "10px auto" }}
              type="firstname"
              label="First Name"
              fullWidth
              required
              name="firstname"
              error={!!(touched.firstname && errors.firstname)}
              helperText={touched.firstname && errors.firstname}
            />

            <Field
              as={TextField}
              sx={{ margin: "5px auto" }}
              type="lastname"
              label="Last Name"
              fullWidth
              required
              name="lastname"
              error={!!(touched.lastname && errors.lastname)}
              helperText={touched.lastname && errors.lastname}
            />

            <Field
              as={TextField}
              sx={{ margin: "5px auto" }}
              type="email"
              label="Email"
              fullWidth
              required
              name="email"
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              sx={{ margin: "5px auto" }}
              type="password"
              label="Password"
              fullWidth
              required
              name="password"
              error={!!(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <Field
              as={TextField}
              sx={{ margin: "10px auto" }}
              type="confirmpass"
              label="Confirm Password"
              fullWidth
              required
              name="confirmpass"
              error={!!(touched.confirmpass && errors.confirmpass)}
              helperText={touched.confirmpass && errors.confirmpass}
            />
            <Box>
              <Button variant="contained" color="warning" type="submit">
                SignUp
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box>
        {succSignup && (
          <Alert severity="success">
            Your are Successfully Signed UP! Please Login
          </Alert>
        )}
        {signupError && <Alert severity="error">{signupError}</Alert>}
      </Box>
    </Box>
  );
};

export default Signup;
