import React from 'react'
import styles from './Record.module.css'
export default function Record({ record }) {
    return (
        <div className={styles.record__container}>
            {record.shares}
        </div>
    )
}
