import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { firebase } from "../../firebase";
import { FormHelperText } from "@material-ui/core";

import mcitylogo from "../../Resources/images/logos/manchester_city_logo.png";

export const CityLogo = (props) => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.width,
        height: props.height,
        background: `url(${mcitylogo}) no-repeat`,
      }}
    ></div>
  );

  if (props.link) {
    return (
      <Link className="link_logo" to={props.linkTo}>
        {template}
      </Link>
    );
  } else {
    return template;
  }
};

export const showToastError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const showToastSuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const logoutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      showToastSuccess("GoodBye !");
    })
    .catch((error) => {
      showToastError(error.message);
    });
};

export const Tag = (props) => {
  const template = (
    <div
      style={{
        background: props.bck ? props.bck : "#ffffff",
        fontSize: props.size ? props.size : "15px",
        color: props.color ? props.color : "#000000",
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...props.add,
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
  } else {
    return template;
  }
};

export const textErrorHelper = (formik, values) => ({
  error: formik.touched[values] && formik.errors[values],
  helperText:
    formik.touched[values] && formik.errors[values]
      ? formik.errors[values]
      : null,
});

export const selectErrorHelper = (formik, values) => {
  if (formik.touched[values] && formik.errors[values]) {
    return <FormHelperText>{formik.errors[values]}</FormHelperText>;
  }
  return false;
};

export const selectIsError  = (formik,values) =>{
return formik.touched[values]&&formik.errors[values];
}
