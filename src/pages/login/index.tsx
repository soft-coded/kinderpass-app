import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import "./login.css";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(5, "At least 5 characters"),
});

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Log In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            navigate("/");
          }, 1000);
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-container"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-container"
              />
            </div>
            <button
              type="submit"
              className="primary-btn"
              disabled={!dirty || isSubmitting || !isValid}
            >
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
