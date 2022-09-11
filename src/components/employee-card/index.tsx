import classes from "./employee-card.module.css";
import { EmployeeDetails } from "../../types";
import { deleteEmployee } from "../../api/db";
import { useAppDispatch } from "../../store";
import { employeeModalActions } from "../../store/employee-modal-slice";

export default function EmployeeCard(props: EmployeeDetails) {
  const dispatch = useAppDispatch();

  async function handleDelete() {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this employee?"
      );
      if (!confirmed) return;
      await deleteEmployee(props.empId!);
      window.location.href = "/";
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleEdit() {
    dispatch(employeeModalActions.showModal({ ...props, mode: "edit" }));
  }

  return (
    <div className={classes["employee-card"]}>
      <header>
        <h2>
          {props.firstName} {props.lastName}
        </h2>
        <div className={classes["buttons"]}>
          <span className={classes["edit"]} onClick={handleEdit}>
            EDIT EMPLOYEE
          </span>
          <span className={classes["delete"]} onClick={handleDelete}>
            DELETE EMPLOYEE
          </span>
        </div>
      </header>
      <ul>
        <li>
          ID: <span>{props.empId}</span>
        </li>
        <li>
          Mobile number: <span>{props.mobileNumber}</span>
        </li>
        <li>
          Date of birth: <span>{props.dateOfBirth}</span>
        </li>
        <li>
          Address: <span>{props.address}</span>
        </li>
        <li>
          City: <span>{props.city}</span>
        </li>
      </ul>
    </div>
  );
}
