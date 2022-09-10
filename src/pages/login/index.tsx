import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "../../store/index";
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
  const dispatch = useAppDispatch();
  const formError = useAppSelector((state) => state.auth.error);

  return (
    <div className="container">
      <h1>Log In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await dispatch(loginThunk(values));
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
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
