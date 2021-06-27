import React, { useState, useEffect } from 'react';
import styles from './OwnedList.module.css';


export default function OwnedList({ asset, price }) {
  console.log(price)

  return (
    <>
      <div className={styles.listItem}>
        <h2>{asset.ticker}</h2>
        <h3>{asset.shares} shares</h3>
        {/* <h3>{price}</h3> */}
      </div>
    </>
  );
}
