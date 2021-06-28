import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Githubs.module.css'

export default function Githubs() {

  return (
    <>
      <div className={styles.projectTitle}>
        <h1>Project Contributors</h1>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.andrew}>
          <a href="https://github.com/aMoss5150">
            <h1>Andrew Moss</h1>
          </a>
        </div>
        <div className={styles.john}>
          <h1>John Sims</h1>
          <div className={styles.githubImg}>
            <a href="https://github.com/DaltonR121">
              <img src='https://avatars.githubusercontent.com/u/74082034?v=4' />
            </a>
          </div>
        </div>
        <div className={styles.ryan}>
          <h1>Ryan Dalton</h1>
            <div className={styles.githubImg}>
              <a href="https://github.com/simzeee">
                <img src='https://avatars.githubusercontent.com/u/24722493?v=4' />
              </a>
            </div>
        </div>
        <div className={styles.zaviar}>
          <h1>Zaviar Brown</h1>
            <div className={styles.githubImg}>
              <a href="https://github.com/ZaviarBrown">
                <img src='https://avatars.githubusercontent.com/u/76716048?v=4' />
              </a>
            </div>
        </div>
      </div>
    </>
  );
}
