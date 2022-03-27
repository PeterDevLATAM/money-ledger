import styles from "./nav-bar.module.css";

import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return <nav className={styles.navbar}>
      <ul>
          <li className={styles.title}> <Link to={"/"}>MyMoney</Link> </li>
          <li> <Link to={'/login'}>Login</Link> </li>
          <li> <Link to={'/signup'}>Signup</Link> </li>
      </ul>
  </nav>;
}
