import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./login.css";

interface FormValues {
  email: string;
  password: string;
}

interface ValidationValues {
  email?: string;
  password?: string;
}

function validate(values: FormValues) {
  const errors: ValidationValues = { email: "", password: "" };

  const email = values.email.trim();
  const password = values.password.trim();

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = "Invalid email address";
  } else {
    delete errors.email;
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 5) {
    errors.password = "Password should have at least 5 characters";
  } else {
    delete errors.password;
  }

  return errors;
}

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Log In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validate}
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
