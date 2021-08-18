import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { CircularProgress } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToastError, showToastSuccess } from "../../Utils/tools";
import { promotionsCollection } from "../../../firebase";

const Enroll = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .required("The Email is required"),
    }),

    onSubmit: (values) => {
      setLoading(true);
      submitForm(values);
    },
  });


  const submitForm = async(values) =>{

try{

    const isOnTheList = await promotionsCollection.where('email','==',values.email).get();

    if(isOnTheList.docs.length >= 1)
    {
        showToastError('Sorry you are already on user List... :(');
        
        setLoading(false);
        return false;
      
    }
   
    await promotionsCollection.add({email: values.email});
    formik.resetForm();
    setLoading(false);
        showToastSuccess('Congratulation!!! :)')
    

}catch(error){
    showToastError(error);
}



  }




  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="enroll_title">Enter your Email</div>
          <div className="enroll_input">
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your Email"
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="error_label">{formik.errors.email}</div>
            ) : null}

            {loading ? (
              <CircularProgress color="secondary" className="progress" />
            ) : (
              <button type="submit">Enroll</button>
            )}

            <div className="enroll_discl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since.
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
