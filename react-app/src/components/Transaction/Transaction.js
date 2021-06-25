import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  editOneAsset,
  getAllAssets,
  deleteOneAsset,
  createOneAsset,
} from '../../store/assets';
import {
  createATransaction,
  getAllTransactions,
} from '../../store/transactions';

import styles from './Transaction.module.css';

export default function Transaction({ planetId}) {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets);
  const userId = useSelector((state) => state.session.user.id);
  let planet = useSelector((state) => state.planet);
  planet= planet[planet]
  
  const userCash = useSelector((state) => state.session.user.cash_balance);

  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('');
  
  const [currentPrices, setCurrentPrices] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let assetPrice = 5.3545234; //! place holder for the price we grab from algorithm
    let asset = Object.values(assets);
    let number;
    let found = asset.find(
      (el) => el['planetId'] === +planetId && el['userId'] === +userId
    )
      ? asset.find(
          (el) => el['planetId'] === +planetId && el['userId'] === +userId
        )
      : null;
    if (found) {
      if (orderType === 'sell') {
        //! ORDER TYPE SELL
        if (amount * 1 === found.shares) {
          //! factoring in total price to deal with user cash
          let totalPrice = amount * 1 * assetPrice;
          number = amount * 1;
          dispatch(deleteOneAsset(found.id, totalPrice));
          dispatch(getAllAssets());
          //! dispatch delete
          //! delete because they are selling all their shares
          return;
        } else if (amount > found.shares) {
          window.alert("You don't own that many shares.");
          return;
        }
        //! converting to a negative number pre dispatch
        let totalPrice = amount * 1 * assetPrice;
        number = amount * -1;
        dispatch(editOneAsset(found.id, number, totalPrice));
        dispatch(getAllAssets());
      } else if (orderType === 'buy') {
        let totalPrice = amount * -1 * assetPrice;
        console.log(totalPrice);
        number = amount * 1;
        let transPrice = number * assetPrice;
        //! if (cash balance is enough) //! THIS MEANS ORDER TYPE IS BUY
        dispatch(editOneAsset(found.id, number, totalPrice));
        dispatch(createATransaction(transPrice, +planetId, number));
        dispatch(getAllAssets());
      }
    } else {
      //! IF FOUND IS set to NULL---------
      if (orderType === 'buy') {
        let totalPrice = amount * -1 * assetPrice;
        number = amount * 1;
        let transPrice = number * assetPrice;
        dispatch(createOneAsset(number, +planetId, totalPrice));
        dispatch(createATransaction(transPrice, +planetId, number));
        dispatch(getAllAssets());
      } else {
        if (orderType === 'sell') {
          alert("You don't have any to sell");
          return;
        }
      }
      return;
    }

    //maybe push history("/")??
  };

  
  console.log('MY PLANET ID', planetId);

  useEffect(() => {
    dispatch(getAllAssets());
    dispatch(getAllTransactions());
  }, [amount]);

  return (
    <>
    <div className={styles.transaction__container}>
      <div className={styles.orderContainer}>
        <div className={styles.order}>
        Buy {planet?.name}
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
          <div className={styles.price}> {planet?.price}</div>
        </div>
        <div className={styles.transactionButtons}>
          <button onClick={() => setOrderType('buy')}>Buy</button>
          <button onClick={() => setOrderType('sell')}>Sell</button>
        </div>
      </form>
    </div>
    </>
  );
}
