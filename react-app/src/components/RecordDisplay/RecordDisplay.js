import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTransactions } from '../../store/transactions'
import Record from '../Record/Record'
import styles from './RecordDisplay.module.css'

export default function RecordDisplay({ planetId }) {
    const dispatch = useDispatch();
    let allRecords = useSelector(state => state.transactions)
    let targetRecords
    // is either all records or the planetId that was passed in
    allRecords = Object.values(allRecords)

    useEffect(() => {
        dispatch(getAllTransactions())
    }, [dispatch])

    if (!targetRecords) return null

    return (
        <div className={styles.transaction__page}>
            {targetRecords.map((record) => (
                <Record record={record} />
            ))}
        </div>
    )
}


