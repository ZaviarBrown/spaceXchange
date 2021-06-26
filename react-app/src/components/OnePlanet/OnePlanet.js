import React from 'react';
import styles from './OnePlanet.module.css';

export default function OnePlanet({ planet }) {
  return (
    <>
      <div className={styles.onePlanet}>
        <div>{planet.name}</div>
        <div>{planet.ticker}</div>
      </div>
    </>
  );
}
