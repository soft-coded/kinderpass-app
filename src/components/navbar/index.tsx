import { Link } from "react-router-dom";
import clsx from "clsx";

import classes from "./navbar.module.css";

export default function NavBar() {
  return (
    <nav className={clsx(classes.navbar, "container")}>
      <Link to="/">
        <h3>Management Portal</h3>
      </Link>
      <div className={classes.buttons}>
        <Link to="/login">
          <button className="primary-btn">Log In</button>
        </Link>
        <Link to="/signup">
          <button className="secondary-btn">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}
