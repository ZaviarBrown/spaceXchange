import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { init } from "ityped";
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
    return <Redirect to="/" />;
  }

  // typing animation
  function animatedTyping() {
    let componentDidMount() {
      const myElement = document.querySelector("#myElement");
      init(myElement, {
        showCursor: false,
        strings: ["Best Reactjs Blog", "Blogreact is God", "Blogreact is Awesome"]
      });
    }
    let render() {
      return <div id="myElement"></div>;
    }
  }

  return (
    <div className={styles.signupPageContainer}>
      <div className={styles.signupImgContainer}>
        <img src='https://art-oboi.by/assets/images/by_users/Kids/fotolia_87367454_subscription_monthly_xxl.jpg' />
      </div>
      <div className={styles.signupFormContainer}>
        <Hello />
        <h1 id='loginText'>welcome to spaceXchange</h1>
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
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
