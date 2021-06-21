
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Buy.module.css'


export default function Buy({ planetId }) {
    const dispatch = useDispatch()
    // const assets = useSelector(state => state.assets)
    // need logic to handle refresh... maybe useParams to
    // find our asset
    const [amount, setAmount] = useState('')

    const handleSubmit = () => {
        const body = {
            amount
        }
        //dispatch what we need to dispatch
        //maybe push history("/")??
    }
    //! create conditional rendering also using ternaries and state to
    //! handle either BUY or SELL

    // if (!assets) {
    //     return null
    // }
    return (
        <div className={styles.buy__container}>
            <form action="" onSubmit={handleSubmit}>
                Buy Test
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

            </form>
        </div>
    )
}

