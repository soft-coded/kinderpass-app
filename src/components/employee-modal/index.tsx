import { useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import classes from "./employee-modal.module.css";
import { employeeModalActions } from "../../store/employee-modal-slice";
import { useAppSelector, useAppDispatch } from "../../store";
import { EmployeeDetails } from "../../types";
import { addEmployee } from "../../api/db";

const validationSchema = yup.object().shape({
  empId: yup.string().trim().required("Required"),
  firstName: yup.string().trim().required("Required"),
  lastName: yup.string().trim().required("Required"),
  mobileNumber: yup
    .number()
    .required("Required")
    .typeError("Invalid phone number")
    .min(1000000000, "Mobile number must be 10 digit long")
    .max(9999999999, "Mobile number must be 10 digit long"),
  address: yup.string().trim().required("Required"),
  city: yup.string().trim().required("Required"),
  dateOfBirth: yup.string().trim().required("Required"),
});

export default function EmployeeModal() {
  const employeeDetails = useAppSelector((state) => state.employeeModal);
  const managerEmail = useAppSelector((state) => state.auth.email);
  const dispatch = useAppDispatch();
  const [formError, setFormError] = useState<string | null>(null);

  const initialValues: EmployeeDetails = {
    empId: employeeDetails.empId || "",
    firstName: employeeDetails.firstName || "",
    lastName: employeeDetails.lastName || "",
    mobileNumber: employeeDetails.mobileNumber || "",
    address: employeeDetails.address || "",
    city: employeeDetails.city || "",
    dateOfBirth: employeeDetails.dateOfBirth || "",
  };

  // prevent function recreation
  const handleModalClose = useCallback(() => {
    dispatch(employeeModalActions.hideModal());
  }, [dispatch]);

  return (
    <>
      <div className="backdrop" />
      <div className={classes["employee-modal"]}>
        <header>
          <h2>Employee Details</h2>
          <h2 className={classes["close"]} onClick={handleModalClose}>
            &#10006;
          </h2>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const confirmed = window.confirm(
                "Are you sure you want to add this employee?"
              );
              if (!confirmed) return;
              setFormError(null);
              const valuesToSend = { ...values, managerEmail: managerEmail! };
              await addEmployee(valuesToSend);
              dispatch(employeeModalActions.hideModal());
              window.location.href = "/";
            } catch (err: any) {
              setFormError(err.message);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className={classes["employee-form"]}>
              <div className="form-group">
                <label htmlFor="emp-id">Employee ID</label>
                <Field name="empId" id="emp-id" />
                <ErrorMessage
                  name="empId"
                  component="div"
                  className="error-container"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emp-first-name">First name</label>
                <Field name="firstName" id="emp-first-name" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-container"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emp-last-name">Last name</label>
                <Field name="lastName" id="emp-last-name" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-container"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emp-mobile-number">Mobile number</label>
                <Field name="mobileNumber" id="emp-mobile-number" />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="error-container"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emp-address">Address</label>
                <Field name="address" id="emp-address" />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error-container"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emp-city">City</label>
                <Field name="city" id="emp-city" />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="error-container"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emp-dob">Date of birth (DD-MM-YYYY)</label>
                <Field name="dateOfBirth" id="emp-dob" />
                <ErrorMessage
                  name="dateOfBirth"
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
                {isSubmitting ? "Adding..." : "Add employee"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
