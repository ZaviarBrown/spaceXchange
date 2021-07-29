import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Githubs from "../Githubs/Githubs";
import galaxy from "../../assets/SpaceArt.png";
import styles from "./Splash.module.css";

export default function Splash() {
  return (
    <>
      <div className={styles.navContainer}>
        <NavBar />
      </div>
      <div className={styles.splashContainer}>
        <div className={styles.mainContent}>
          <div className={styles.mainContentDivider}>
            <div className={styles.mainContentLeft}>
              <div className={styles.leftTitle}>
                <h1>
                  SPACE Investing <br /> For Everyone!
                </h1>
              </div>
              <h3>
                Commission-free investing, plus the tools you need to put your
                money in motion.{" "}
              </h3>
              <div className={styles.signupButton}>
                <NavLink
                  to="/sign-up"
                  className={styles.navsignup}
                  exact={true}
                  activeClassName="active"
                >
                  Sign Up
                </NavLink>
              </div>
            </div>
            <div className={styles.mainContentRight}>
              <img src={galaxy} />
            </div>
          </div>
        </div>
        <div className={styles.secondaryContent}>
          <Githubs />
        </div>
      </div>
    </>
  );
}
