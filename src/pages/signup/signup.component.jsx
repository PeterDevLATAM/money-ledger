import styles from "./signup.module.css";

import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, error, isPending } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      signUp(displayName, email, password);
    } else {
      alert("Passwords don't match");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>SignUp</h2>
      <label>
        <span>Display Name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Email: </span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span> Password: </span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span> Confirm Password: </span>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      </label>
      {!isPending && <button className="btn">Sign Up</button>}
      {isPending && <button className="btn"disabled>Loading..</button>}
      {error && <p>{error}</p>}
    </form>
  );
}
