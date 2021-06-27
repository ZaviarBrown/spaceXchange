import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Chart from '../Chart/Chart';
import styles from './Portfolio.module.css';
import OwnedList from '../OwnedList/OwnedList';
import { getListItems } from '../../store/ownedList';
import { authenticate } from '../../store/session';
import { getAllAssets } from '../../store/assets';
import { getAllTransactions } from '../../store/transactions';
import Article from '../articles/Article';

import F, { F2 } from '../../utils/formatter'

export default function Portfolio() {
  const [prices, setPrices] = useState([]);
  const cash_balance = useSelector((state) => state.session.user.cash_balance);
  const ownedAssets = useSelector((state) => Object.values(state.ownedList));
  const [assets, setAssets] = useState(ownedAssets)
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();


  const getArticles = async () => {
    const data = await fetch('/api/article');
    const result = await data.json();
    return setArticles(result);
  };

  // raspberry route
  const getPrices = async () => {
    const data = await fetch('/api/raspberry/')
    const result = await data.json()
    const resultArray = Array.from(result)
    setPrices(resultArray)
  }

  const grabPrice = (asset, priceObj) => {
    console.log(typeof (priceObj))
    // let planetName = asset.planetName.toLowerCase();
    // let planetData = priceObj[planetName];

    return
  }
  useEffect(() => {
    dispatch(getListItems());
    getArticles();
    dispatch(authenticate());
    dispatch(getAllAssets());
    dispatch(getAllTransactions());
    // setting interval to hit raspberry route
    const interval = setInterval(getPrices, 2000);
    // clearing interval on componentWillUnmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.portfolio__container}>
      <div className={styles.portfolio__left}>
        <h1>Your Portfolio</h1>
        <div className={styles.portfolio__chart__container}>
          <Chart />
        </div>
        <div className={styles.chart__control}></div>
        <div className={styles.buyingpower__container}>
          <div className={styles.statsContainer}>
            Stats
            <div>Buying Power: {F(cash_balance)}</div>
            <div>Account Value: </div>
          </div>
        </div>
        <div className={styles.news__container}>
          <h1>
            Recent News
          </h1>
          {Object.values(articles).map((article) => (
            <Article article={article} />
          ))}
        </div>
      </div>
      <div className={styles.portfolio__right}>
        <div className={styles.sidebarContainer}>
          <div className={styles.listTitle}>
            <h2>Owned</h2>
            <hr />
          </div>
          <div className={styles.listContainer}>
            {ownedAssets && prices && (
              <div>
                {ownedAssets.map((asset) => (
                  <NavLink to={`/planet/${asset.planetId}`}>
                    <OwnedList asset={asset} price={grabPrice(asset, prices)} key={asset.id} />
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
