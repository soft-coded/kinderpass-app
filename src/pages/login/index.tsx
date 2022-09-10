import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { useAppDispatch } from "../../store/index";
import { loginThunk } from "../../store/auth-slice";

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
    .min(6, "At least 6 characters"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formError, setFormError] = useState<string | null>(null);

  return (
    <div className="container">
      <h1>Log In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setFormError(null);
            await dispatch(loginThunk(values)).unwrap();
            navigate("/");
          } catch (err: any) {
            setFormError(err.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="login-form">
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
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage
                name="password"
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
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
