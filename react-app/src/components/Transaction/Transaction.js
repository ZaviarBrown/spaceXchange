import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editOneAsset, getAllAssets } from '../../store/assets';

import styles from './Transaction.module.css';

export default function Transaction({ planetId }) {
  const dispatch = useDispatch();
  const assets = useSelector(state => state.assets);
  const userId = useSelector(state => state.session.user.id);

  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let asset = Object.values(assets)
    let number
    let found = asset.find((el) => el['planetId'] === +planetId && el['userId'] === +userId) ? asset.find((el) => el['planetId'] === +planetId && el['userId'] === +userId) : null;
    if (found) {
      if (orderType === 'sell') { //! ORDER TYPE SELL
        if (amount === found.shares) {
          //! dispatch delete
          //!delete because they are selling all their shares
          return
        }
        if (amount > found.shares) {
          //they don't own this asset
          window.alert("You don't own that many shares.")
          return
        }
        //! converting to a negative number pre dispatch
        number = amount * -1
        dispatch(editOneAsset(found.id, number))

      } else if (orderType === 'buy') {  //!THIS MEANS ORDER TYPE IS BUY
        //!BUY LOGIC GOES HERE
      }
    } else { //! IF FOUND IS set to NULL---------
      // we will have to create the asset
      return
    }

    //maybe push history("/")??
  };

  useEffect(() => {
    dispatch(getAllAssets());
  }, []);

  //! create conditional rendering also using ternaries and state to
  //! handle either BUY or SELL
  // let ownedAssets;

  // if (!ownedAssets) {
  //     return null
  // }
  return (
    <div className={styles.transaction__container}>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        Buy Test
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={() => setOrderType('buy')}>Buy</button>
        <button onClick={() => setOrderType('sell')}>Sell</button>
      </form>
    </div>
  );
}
