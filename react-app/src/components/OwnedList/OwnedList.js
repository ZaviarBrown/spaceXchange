import React, { useState, useEffect } from 'react';
import styles from './OwnedList.module.css';

export default function OwnedList({ asset }) {

  
  return (
    <div className={styles.listContainer}>
      <div className={styles.listItem}>
        <h2>{asset.ticker}</h2>
        <h3>{asset.shares} shares</h3>
      </div>
    </div>
  );
}
