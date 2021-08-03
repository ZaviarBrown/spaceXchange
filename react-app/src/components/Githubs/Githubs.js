import React from "react";
import { Link } from "react-router-dom";
import styles from "./Githubs.module.css";

export default function Githubs() {
  return (
    <>
      <div className={styles.projectTitle}>
        <h1>Project Contributors</h1>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.space}></div>
        <a href="https://github.com/aMoss5150">
          <div className={styles.andrewContainer}>
            <div className={styles.andrew}>
              <h1>Andrew Moss</h1>
              <div className={styles.githubImg}>
                <img src="https://avatars.githubusercontent.com/u/74944923?v=4" />
              </div>
            </div>
          </div>
        </a>
        <a href="https://github.com/DaltonR121">
          <div className={styles.ryanContainer}>
            <div className={styles.ryan}>
              <h1>Ryan Dalton</h1>
              <div className={styles.githubImg}>
                <img src="https://avatars.githubusercontent.com/u/24722493?v=4" />
              </div>
            </div>
          </div>
        </a>
        <a href="https://github.com/simzeee">
          <div className={styles.johnContainer}>
            <div className={styles.john}>
              <h1>John Sims</h1>
              <div className={styles.githubImg}>
                <img src="https://avatars.githubusercontent.com/u/74082034?v=4" />
              </div>
            </div>
          </div>
        </a>
        <a href="https://github.com/ZaviarBrown">
          <div className={styles.zaviarContainer}>
            <div className={styles.zaviar}>
              <h1>Zaviar Brown</h1>
              <div className={styles.githubImg}>
                <img src="https://avatars.githubusercontent.com/u/76716048?v=4" />
              </div>
            </div>
          </div>
        </a>
        <div className={styles.space2}></div>
      </div>
    </>
  );
}
