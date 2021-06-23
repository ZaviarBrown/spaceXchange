import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editOneAsset, getAllAssets } from '../../store/assets';

import styles from './Transaction.module.css';

export default function Transaction({ planetId }) {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets);
  const userId = useSelector((state) => state.session.user.id);

  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let asset = Object.values(assets);
    let number;
    let found = asset.find((el) => el['planetId'] === +planetId);

    if (found) {
      if (orderType === 'sell') {
        if (amount === found.shares) {
          //delete
          return 
        }
        if (amount > found.shares) {
          window.alert("You don't own that many shares.");
          return;
        }
        number = amount * -1;
      } 
      dispatch(editOneAsset(found.id, number))
      //updating a share they own
    } else {
      //they don't own this asset
      if (orderType === 'buy') {
        window.alert("You don't own this coin.");
        return;
      } else {
        //dispatch create
      }
    }

    //maybe push history("/")??
  };

  useEffect(() => {
    dispatch(getAllAssets());
  }, []);

  //! create conditional rendering also using ternaries and state to
  //! handle either BUY or SELL
  let ownedAssets;

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
