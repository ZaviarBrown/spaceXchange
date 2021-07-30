import React, { useState, useEffect } from 'react';
import styles from './OwnedList.module.css';
import ChartForList from '../Chart/ChartForList'
import F, { F4 } from '../../utils/formatter'


export default function OwnedList({ asset, price }) {
  price = price?.price ? price?.price < 10 ? F4(price?.price) : F(price?.price) : "fetching..."
  return (
    <>
      <div className={styles.listItem}>
        <h2>{asset.ticker}</h2>
        <h3>{asset.shares} shares</h3>
        <h3>{price}</h3>
        <h4> <ChartForList crypto={asset.crypto} /></h4>
      </div>
    </>
  );
}
