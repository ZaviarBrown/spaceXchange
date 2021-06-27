import React from 'react';
import styles from './OnePlanet.module.css';
import ChartForList from '../Chart/ChartForList'
import F from '../../utils/formatter'

export default function OnePlanet({ planet, prices }) {

  return (

    <>
      <div className={styles.onePlanet}>
        <div className={styles.planetGrid}>
          {planet.name}
        </div>
        <div className={styles.planetGrid}>
          {planet.ticker}
        </div>
        <div className={styles.planetGrid}>
          {prices[planet.name.toLowerCase()]?.price ? F(prices[planet.name.toLowerCase()]?.price) : "fetching..."}
        </div>
        <div>
          <h4> <ChartForList crypto={planet.crypto} /></h4>
        </div>
      </div>
    </>
  );
}
