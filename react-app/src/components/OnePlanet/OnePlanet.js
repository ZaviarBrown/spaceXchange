import React from "react";
import styles from "./OnePlanet.module.css";
import ChartForList from "../Chart/ChartForList";
import F, { F4 } from "../../utils/formatter";
import { RingLoader } from "react-spinners";

export default function OnePlanet({ planet, prices }) {
  return (
    <>
      <div className={styles.onePlanet}>
        <div id={styles.planetName} className={styles.planetGrid}>
          {planet.name}
        </div>
        <div className={styles.planetGrid}>{planet.ticker}</div>
        <div className={styles.planetGrid}>
          {prices[planet.name.toLowerCase()]?.price ? (
            prices[planet.name.toLowerCase()]?.price < 10 ? (
              F4(prices[planet.name.toLowerCase()]?.price)
            ) : (
              F(prices[planet.name.toLowerCase()]?.price)
            )
          ) : (
            <RingLoader size={27} color="white" loading />
          )}
        </div>
        <div>
          <h4>
            {" "}
            <ChartForList crypto={planet.crypto} />
          </h4>
        </div>
      </div>
    </>
  );
}
