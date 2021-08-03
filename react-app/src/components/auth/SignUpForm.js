import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import galaxySky from "../../assets/galaxySkyRight.png";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [match, setMatch] = useState(true);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
    } else {
      setErrors(["Passwords must match"]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(() => {
    if (password !== repeatPassword) {
      setMatch(false);
    } else {
      setMatch(true);
    }
  }, [password, repeatPassword]);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.signupPageContainer}>
      <div className={styles.siteTitle}>
        <h1>spaceXchange</h1>
      </div>
      <div className={styles.signupFormContainer}>
        <div className={styles.signUpFormTitle}>
          <h1>Make Your Money Move</h1>
        </div>
        {errors.length > 0 ? (
          <div className={styles.errorDiv}>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
        ) : null}
        <form onSubmit={onSignUp}>
          <div>
            <label>User Name</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              className={styles.inputBox}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              className={styles.inputBox}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              className={styles.inputBox}
            ></input>
          </div>
          <div>
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              className={styles.inputBox}
            ></input>
            <div> {match ? "" : "Passwords do not match"}</div>
          </div>
          <div className={styles.signupButtons}>
            <button type="submit">Sign Up</button>
          </div>
          <div className={styles.accountAlready}>
            <NavLink to="/login">
              <p>Already have an account? Please click here!</p>
            </NavLink>
          </div>
        </form>
        <div className={styles.signupDisclaimer}>
          <p>
            All investments involve risk, including the possible loss of
            principal. Investors should consider their investment objectives and
            risks carefully before investing.
          </p>
          <br />
          <p>
            Commission-free trading means $0 commission trading on self-directed
            individual cash or margin brokerage accounts that trade U.S. listed
            securities via mobile devices or web. Keep in mind, other fees such
            as trading (non-commission) fees, wire transfer fees, and paper
            statement fees may apply to your brokerage account. Securities
            trading offered through spaceXchange.
          </p>
        </div>
      </div>
      <div className={styles.spacerDiv}></div>
      <div className={styles.signupImgContainer}>
        <img src={galaxySky} />
      </div>
    </div>
  );
};

export default SignUpForm;
