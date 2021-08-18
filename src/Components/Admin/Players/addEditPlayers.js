import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/adminLayout";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  showToastError,
  showToastSuccess,
  textErrorHelper,
  selectErrorHelper,
  selectIsError,
} from "../../Utils/tools";

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@material-ui/core";

import { playerCollection, firebase } from "../../../firebase";

import Fileuploader from "../../Utils/fileUploder";

const defaultValues = {
  name: "",
  lastname: "",
  number: "",
  position: "",
  image: "",
};

const AddEditPlayers = (props) => {
  const [formType, setFormType] = useState("");

  const [value, setValue] = useState(defaultValues);

  const [loading, setLoading] = useState(false);

  const [defaultImg,setDefaultImg] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: value,

    validationSchema: Yup.object({
      name: Yup.string().required("Name Field is Required"),
      lastname: Yup.string().required("Lastname Fiels is Required"),
      number: Yup.number()
        .required("Number is Required")
        .min(0, "The minimum value is Zero")
        .max(99, "The Maximum value is 99"),
      position: Yup.string().required("Position is Required"),
      image: Yup.string().required("Image is Required"),
    }),

    onSubmit: (value) => {
      console.log(value);
      submitForm(value);
    },
  });

  const submitForm = (value) => {
    let valueToPass = value;
    setLoading(true);

    if (formType === "add") {
      playerCollection
        .add(valueToPass)
        .then(() => {
          showToastSuccess("Player Added...!!!!!");

          formik.resetForm();

          props.history.push("/admin_players");
        })
        .catch((error) => {
          showToastError(error);
        });
    } else {
      playerCollection
        .doc(props.match.params.playerid)
        .update(valueToPass)
        .then(() => {
          showToastSuccess("Player Updated..!! :)");
        })
        .catch((error) => {
          showToastError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const param = props.match.params.playerid;

    if (param) {
      playerCollection
        .doc(param)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {


            firebase.storage().ref('player')
            .child(snapshot.data().image).getDownloadURL()
            .then(url => {
              updateImage(snapshot.data().image)
              setDefaultImg(url) 
            });


            setFormType("edit");
            setValue(snapshot.data());
          } else {
            showToastError("Sorry, Player not Found...!!");
          }
        })
        .catch((error) => {
          showToastError(error);
        });
    } else {
      setFormType("add");
      setValue(defaultValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.playerid]);


  const updateImage = (filename) => {
    formik.setFieldValue("image", filename);
  };


const resetImage = () => {

  formik.setFieldValue("image","");
  setDefaultImg("")

}

  return (
    <AdminLayout title={formType === "add" ? "Add Player" : "Edit Player"}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <FormControl error={selectIsError(formik, "image")}>
              <Fileuploader
                dir="player"
                defaultImg={defaultImg}
                defaultImgName={formik.values.image}
                filename={(filename) => updateImage(filename)}
                resetImage={()=>resetImage()}
              />
              {selectErrorHelper(formik, "image")}
            </FormControl>

            <hr />
            <h4>Player Info</h4>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="name"
                  name="name"
                  variant="outlined"
                  placeholder="Enter FirstName"
                  {...formik.getFieldProps("name")}
                  {...textErrorHelper(formik, "name")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="lastname"
                  name="lastname"
                  variant="outlined"
                  placeholder="Enter LastName"
                  {...formik.getFieldProps("lastname")}
                  {...textErrorHelper(formik, "lastname")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  type="number"
                  id="number"
                  name="number"
                  variant="outlined"
                  placeholder="Enter Number"
                  {...formik.getFieldProps("number")}
                  {...textErrorHelper(formik, "number")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl error={selectIsError(formik, "position")}>
                <Select
                  id="position"
                  name="position"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("position")}
                >
                  <MenuItem value="" disabled>
                    Select a Position
                  </MenuItem>
                  <MenuItem value="Keeper">Keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="Midfield">Midfield</MenuItem>
                  <MenuItem value="Striker">Striker</MenuItem>
                </Select>

                {selectErrorHelper(formik, "position")}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {formType === "add" ? "Add Player" : "Edit Player"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditPlayers;
