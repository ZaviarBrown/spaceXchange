import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import galaxySky from "../../assets/galaxySkyLeft.png"
import Typewriter from 'typewriter-effect';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  const demoLogin = () => {
    setEmail('demo@aa.io');
    setPassword('password');
    login(email, password);
  }

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginImgContainer}>
        <img src={galaxySky} />
      </div>
      <div className={styles.loginFormContainer}>
        <h1 id={styles.loginText}>
        <Typewriter className="workTitle"
            onInit={(typewriter) => {
                typewriter.typeString('Hello!')
                    .pauseFor(1000)
                    .deleteAll()
                typewriter.typeString('welcome to spaceXchange')
                    .pauseFor(2000)
                    .start()
            }}
        />
        </h1>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <div className={styles.loginButtons}>
              <button type="submit">Login</button>
              <button onClick={demoLogin}>Demo</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
