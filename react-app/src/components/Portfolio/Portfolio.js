import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ChartForPortfolio from '../Chart/ChartForPortfolio';
import styles from './Portfolio.module.css';
import OwnedList from '../OwnedList/OwnedList';
import { getListItems } from '../../store/ownedList';
import { authenticate } from '../../store/session';
import { getAllAssets } from '../../store/assets';
import { getAllTransactions } from '../../store/transactions';
import { useArticles } from '../../context/ArticlesContext';
import { usePrices } from '../../context/PricesContext';
import Article from '../articles/Article';

import F, { F2 } from '../../utils/formatter';

export default function Portfolio() {
  const [prices, setPrices] = useState([]);
  const cash_balance = useSelector((state) => state.session.user.cash_balance);
  const ownedAssetsObject = useSelector((state) => state.ownedList);
  const ownedAssets = useSelector((state) => Object.values(state.ownedList));

  const [assets, setAssets] = useState(ownedAssets);
  const [accountValue, setAccountValue] = useState('Fetching...');
  const planets = useSelector((state) => Object.values(state.planet));

  const { articlesCtxt, setArticlesCtxt } = useArticles();
  const { pricesCtxt, setPricesCtxt } = usePrices();
  const dispatch = useDispatch();
  const [totalsArr, setTotalsArr] = useState([])

  const getArticles = async () => {
    const data = await fetch('/api/article');
    const result = await data.json();
    return setArticlesCtxt(result);
  };

  // raspberry route
  const getPrices = async () => {
    const data = await fetch('/api/raspberry/');
    const result = await data.json();
    setPricesCtxt(result);
  };





  const getAccountValue = async () => {
    let accountValue = 0;
    let ownedObject = {};

    ownedAssets.forEach((asset) => {
      ownedObject[asset.planetName.toLowerCase()] = asset.id;
    });

    for (const key in pricesCtxt) {
      if (Object.keys(ownedObject).includes(key)) {
        accountValue +=
          pricesCtxt[key].price * ownedAssetsObject[ownedObject[key]].shares;
      }
    }

    setAccountValue(accountValue);
  };

  useEffect(() => {
    dispatch(getListItems());
    getArticles();
    dispatch(authenticate());
    dispatch(getAllAssets());
    dispatch(getAllTransactions());
    // setIsLoaded(true)

    //! DISABLED FOR TESTING
    // setting interval to hit raspberry route
    const interval = setInterval(getPrices, 2000);
    // clearing interval on componentWillUnmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getAccountValue();
  }, [pricesCtxt]);

  return (
    <div className={styles.portfolio__container}>
      <div className={styles.portfolio__left}>
        <h1>Your Portfolio</h1>
        <div className={styles.portfolio__chart__container}>




          <ChartForPortfolio />
        </div>
        <div className={styles.chart__control}></div>
        <div className={styles.buyingpower__container}>
          <div className={styles.statsContainer}>
            Stats
            <div>Buying Power: {F(cash_balance)}</div>
            <div>Account Value: {F(accountValue)} </div>
          </div>
        </div>
        <div className={styles.news__container}>
          <h1>Recent News</h1>
          {Object.values(articlesCtxt).map((article) => (
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
            {ownedAssets && (
              <div>
                {ownedAssets.map((asset) => {
                  let price = pricesCtxt[asset.planetName.toLowerCase()];
                  return (
                    <NavLink to={`/planet/${asset.planetId}`}>
                      <OwnedList asset={asset} price={price} key={asset.id} />
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
