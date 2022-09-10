import clsx from "clsx";

import classes from "./navbar.module.css";

export default function NavBar() {
  return (
    <nav className={clsx(classes.navbar, "container")}>
      <h3>Management Portal</h3>
      <div className={classes.buttons}>
        <button className="primary-btn">Log In</button>
        <button className="secondary-btn">Sign Up</button>
      </div>
    </nav>
  );
}
