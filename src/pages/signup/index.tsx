import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { useAppDispatch } from "../../store";
import { signupThunk } from "../../store/auth-slice";

/*
form values: {
  email,
  firstName,
  lastName,
  password,
  address,
  dateOfBirth,
  company
}
*/

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email"),
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(3, "At least 3 letters"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(3, "At least 3 letters"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(6, "At least 6 characters"),
  address: yup.string().trim().required("Address is required"),
  dateOfBirth: yup.string().trim().required("Date of birth is required"),
  company: yup.string().trim().required("Company is required"),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formError, setFormError] = useState<string | null>(null);

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          address: "",
          dateOfBirth: "",
          company: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setFormError(null);
            await dispatch(signupThunk(values)).unwrap();
            navigate("/");
          } catch (err: any) {
            setFormError(err.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="signup-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-container"
              />
            </div>
            <div className="form-group">
              <label htmlFor="first-name">First name</label>
              <Field type="text" name="firstName" id="first-name" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error-container"
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last name</label>
              <Field type="text" name="lastName" id="last-name" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error-container"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-container"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Field type="text" name="address" id="address" />
              <ErrorMessage
                name="address"
                component="div"
                className="error-container"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date-of-birth">Date of birth (DD-MM-YYYY)</label>
              <Field type="text" name="dateOfBirth" id="date-of-birth" />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="error-container"
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <Field type="text" name="company" id="company" />
              <ErrorMessage
                name="company"
                component="div"
                className="error-container"
              />
            </div>
            {formError && <div className="form-error">{formError}</div>}
            <button
              type="submit"
              className="primary-btn"
              disabled={!dirty || isSubmitting || !isValid}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
