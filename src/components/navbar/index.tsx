import { Link } from "react-router-dom";
import clsx from "clsx";

import classes from "./navbar.module.css";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { logoutThunk } from "../../store/auth-slice";
import { employeeModalActions } from "../../store/employee-modal-slice";

export default function NavBar() {
  const { isAuthenticated: isAuthed } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  async function handleLogout() {
    await dispatch(logoutThunk());
  }

  return (
    <nav className={clsx(classes.navbar, "container")}>
      <Link to="/">
        <h3>Management Portal</h3>
      </Link>
      <div className={classes.buttons}>
        {isAuthed ? (
          <>
            <button
              className="primary-btn"
              onClick={() => dispatch(employeeModalActions.showModal({}))}
            >
              Add employee
            </button>
            <button className="secondary-btn" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="primary-btn">Log in</button>
            </Link>
            <Link to="/signup">
              <button className="secondary-btn">Sign up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
