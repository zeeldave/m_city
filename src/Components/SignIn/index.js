import React, { useState } from "react";
import { firebase } from "../../firebase";

import { CircularProgress } from "@material-ui/core";

import { Redirect } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { showToastError, showToastSuccess } from "../Utils/tools";

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "test123",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),

    onSubmit: (values) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        showToastSuccess("Welcome Back !");
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        showToastError(error.message);
      });
  };

  return (
    <>
      {!props.user ? (
        <div className="container">
          <div
            className="signin_wrapper"
            style={{
              margin: "100px",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <h2>Please Login</h2>

              <input
                name="email"
                placeholder="Enter Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              {formik.touched.email && formik.errors.email ? (
                <div className="error_label">{formik.errors.email}</div>
              ) : null}

              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />

              {formik.touched.email && formik.errors.password ? (
                <div className="error_label">{formik.errors.password}</div>
              ) : null}

              {loading ? (
                <CircularProgress color="secondary" className="progress" />
              ) : (
                <button type="submit">Log in</button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <Redirect to={"/dashboard"} />
      )}
    </>
  );
};

export default SignIn;
