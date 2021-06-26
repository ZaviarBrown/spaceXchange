import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editOneAsset, getAllAssets, deleteOneAsset, createOneAsset } from '../../store/assets';
import { createATransaction, getAllTransactions } from '../../store/transactions';
import F from '../../utils/formatter'
import styles from './Transaction.module.css';

export default function Transaction({ planetId, planetName, ticker }) {
  const dispatch = useDispatch();
  const assets = useSelector(state => state.assets);
  const userId = useSelector(state => state.session.user.id);
  const userCash = useSelector(state => state.session.user.cash_balance)
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('');
  const [prices, setPrices] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    // price is pulled from PRICES STATE OBJECT updated from raspberry route
    let assetPrice = prices[planetName.toLowerCase()].price
    //! for testing
    // let assetPrice = 6
    console.log("asset price\n\n\n", assetPrice)
    console.log('userCash\n\n\n', userCash)
    let asset = Object.values(assets)
    let number
    let found = asset.find((el) => el['planetId'] === +planetId && el['userId'] === +userId) ? asset.find((el) => el['planetId'] === +planetId && el['userId'] === +userId) : null;
    if (found) { // already OWN this ASSET -------------------------------------
      if (orderType === 'sell') { // SELL && FOUND -----------------------------

        if (amount * 1 === found.shares) { // SELL ALL ----------------------
          let totalPrice = amount * 1 * assetPrice
          number = amount * 1 // normalize
          let transPrice = number * assetPrice // price for trans records
          dispatch(deleteOneAsset(found.id, totalPrice))
          dispatch(createATransaction(transPrice, +planetId, number, orderType))
          dispatch(getAllAssets())
        }

        else if (amount > found.shares) { // X SELL more than OWNED X ----------
          window.alert("You don't own that many shares.")
          setAmount('')
          return // kill
        }

        let totalPrice = amount * 1 * assetPrice // price of shares
        number = amount * -1 // normalize
        let transPrice = number * -1 * assetPrice // price for trans records
        dispatch(editOneAsset(found.id, number, totalPrice))
        dispatch(createATransaction(transPrice, +planetId, number * -1, orderType))
        dispatch(getAllAssets())

      } else if (orderType === 'buy') { // BUY && FOUND ------------------------
        let totalPrice = amount * assetPrice * -1
        number = amount * 1 // normalize
        let transPrice = number * assetPrice // price for trans records

        if (userCash >= transPrice) { // checking for enough cash
          dispatch(editOneAsset(found.id, number, totalPrice))
          dispatch(createATransaction(transPrice, +planetId, number, orderType))
          dispatch(getAllAssets())

        } else { // X NOT ENOUGH CASH X
          alert("You don't have the buying power")
          setAmount('')
          return // kill
        }
      }

    } else {
      if (orderType === 'buy') { // BUY && NOT FOUND ---------------------------
        let totalPrice = amount * -1 * assetPrice
        number = amount * 1 // normalize number to send
        let transPrice = number * assetPrice // price for trans records

        if (userCash >= transPrice) { // checking for enough cash
          // createOneAsset requires planet information to create from model
          dispatch(createOneAsset(number, +planetId, totalPrice, planetName, ticker))
          dispatch(createATransaction(transPrice, +planetId, number, orderType))
          dispatch(getAllAssets())

        } else { // X NOT ENOUGH CASH X
          alert("You don't have the buying power")
          setAmount('')
          return // kill
        }

      } else {
        if (orderType === 'sell') { // X SELL && NOT FOUND X -------------------
          alert("You don't have any to sell")
          setAmount('')
          return // kill
        }
      }
      return;
    }
    //maybe push history("/")???????????
    setAmount('')
  };

  // raspberry route
  const getPrices = async () => {
    const data = await fetch('/api/raspberry/')
    const result = await data.json()
    return setPrices(result)
  }

  // on initial load
  useEffect(() => {
    dispatch(getAllAssets());
    dispatch(getAllTransactions())
    // setting interval to hit raspberry route
    const interval = setInterval(getPrices, 2000)
    // clearing interval on componentWillUnmount
    return () => clearInterval(interval)
  }, []);

  if (!prices) return null
  return (
    <>
      <div className={styles.transaction__container}>
        <div className={styles.orderContainer}>
          <div className={styles.order}>
            Buy {planetName}
          </div>
        </div>
        <form
          className={styles.transactionForm}
          action=""
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={styles.shares}>
            <label>Shares:</label>
            <input className={styles.shareInput}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.price}>Market Price:</div>
            <div className={styles.price}> {prices[planetName.toLowerCase()]?.price ? F(prices[planetName.toLowerCase()]?.price) : "fetching..."}</div>
          </div>
          <div className={styles.transactionButtons}>

            <button onClick={() => setOrderType('buy')} disabled={amount > 0 ? false : true}>Buy</button>
            <button onClick={() => setOrderType('sell')} disabled={amount > 0 ? false : true}>Sell</button>
          </div>
        </form>
      </div>
    </>
  );
}
