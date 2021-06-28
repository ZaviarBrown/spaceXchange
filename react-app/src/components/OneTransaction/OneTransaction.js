import React from "react";
import planet from "../../store/planet";
import styles from "./OneTransaction.module.css";
import F, { F2, F3, F4 } from "../../utils/formatter";

export default function OneTransaction({ t, planets }) {
  const id = t.planetId;
  const planet = planets[id - 1];
  const planetName = planet.name;
  const order = t.orderType;
  return (
    <>
      {order === "buy" ? (
        <div className={styles.orderBuy}>
          <div id={styles.planetName} className={styles.orderGrid}>
            {planetName}
          </div>
          <div className={styles.orderGrid}>{t.shares} Shares </div>
          <div className={styles.orderGrid}>
            {t.price_paid / t.shares < 1
              ? F4(t.price_paid / t.shares)
              : F(t.price_paid / t.shares)}{" "}
            Per Share
          </div>
          <div className={styles.orderGrid}>
            Bought For {t.price_paid < 10 ? F4(t.price_paid) : F(t.price_paid)}
          </div>
        </div>
      ) : (
        <div className={styles.orderSell}>
          <div id={styles.planetName} className={styles.orderGrid}>
            {planetName}
          </div>
          <div className={styles.orderGrid}>{t.shares} Shares </div>
          <div className={styles.orderGrid}>
            {t.price_paid / t.shares < 1
              ? F4(t.price_paid / t.shares)
              : F(t.price_paid / t.shares)}{" "}
            Per Share
          </div>
          <div className={styles.orderGrid}>Sold For {t.price_paid < 10 ? F4(t.price_paid) : F(t.price_paid)}</div>
        </div>
      )}
    </>
  );
}
