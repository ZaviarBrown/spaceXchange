import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Chart from '../Chart/Chart'
import styles from './Portfolio.module.css'
import OwnedList from '../OwnedList/OwnedList'


export default function Portfolio() {
    return (
        <div className={styles.portfolio__container}>
            Portfolio test

            <div className={styles.portfolio__left}>
                Left
                <div className={styles.portfolio__chart__container}>
                    <Chart />
                </div>
                <div className={styles.chart__control}>Chart controls</div>
                <div className={styles.buyingpower__container}>buying power</div>
                <div className={styles.news__container}>News placeholder</div>
                <div className={styles.news__container}>News placeholder</div>
                <div className={styles.news__container}>News placeholder</div>
                <div className={styles.news__container}>News placeholder</div>
                <div className={styles.news__container}>News placeholder</div>

            </div>

            <div className={styles.portfolio__right}>
                <OwnedList></OwnedList>
                Right
                <div>
                    List
                </div>

            </div>
        </div>
    )
}


