import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Chart from '../Chart/Chart';
import styles from './Portfolio.module.css';
import OwnedList from '../OwnedList/OwnedList';
import { getListItems } from '../../store/ownedList';
import { authenticate } from '../../store/session'
import Article from '../articles/Article';

import F, { F2 } from '../../utils/formatter'

export default function Portfolio() {
  const cash_balance = useSelector((state) => state.session.user.cash_balance);
  const ownedAssets = useSelector((state) => Object.values(state.ownedList));
  const [assets, setAssets] = useState(ownedAssets)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListItems());
    setAssets(ownedAssets)
  }, [assets]);
  const [prices, setPrices] = useState({})
  const dispatch = useDispatch();

  // raspberry route
  const getPrices = async () => {
    const data = await fetch('/api/raspberry/')
    const result = await data.json()
    return setPrices(result)
  }

  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const data = await fetch('/api/article');
    const result = await data.json();
    return setArticles(result);
  };


  useEffect(() => {
    dispatch(getListItems());
    getArticles();
    dispatch(authenticate())
    const interval = setInterval(getPrices, 2000)
    // clearing interval on componentWillUnmount
    return () => clearInterval(interval)
  }, []);

  return (
    <div className={styles.portfolio__container}>
      <div className={styles.portfolio__left}>
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
          {Object.values(articles).map((article) => (
            <Article article={article} />
          ))}
        </div>
      </div>
      <div className={styles.portfolio__right}>
        <div className={styles.listTitle}>
          <h2>Owned</h2>
        </div>
        <div className={styles.listContainer}>
          {ownedAssets && (
            <div>
              {ownedAssets.map((asset) => (
                <NavLink to={`/planet/${asset.id}`}>
                  <OwnedList asset={asset} key={asset.id} />
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
