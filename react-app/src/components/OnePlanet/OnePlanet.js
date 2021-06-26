import React from 'react';
import styles from './OnePlanet.module.css';
import F from '../../utils/formatter'

export default function OnePlanet({ planet, prices }) {

  return (
    <>
      <div className={styles.onePlanet}>
        {/* <div>{planet.name}</div> */}
        <div>{planet.ticker}</div>
        <div>Price:</div>
        <div>{prices[planet.name.toLowerCase()]?.price ? F(prices[planet.name.toLowerCase()]?.price) : "fetching..."}</div>
      </div>
    </>
  );
}
