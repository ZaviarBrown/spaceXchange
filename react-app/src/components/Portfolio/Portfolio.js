import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Chart from '../Chart/Chart';
import styles from './Portfolio.module.css';
import OwnedList from '../OwnedList/OwnedList';
import { getListItems } from '../../store/ownedList';
import Article from '../articles/Article';
import F, { F2 } from '../../utils/formatter'

export default function Portfolio() {
  const cash_balance = useSelector((state) => state.session.user.cash_balance);
  const ownedAssets = useSelector((state) => Object.values(state.ownedList));
  console.log("OWNED", ownedAssets)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListItems());
  }, []);

  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const data = await fetch('/api/article');
    const result = await data.json();
    return setArticles(result);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className={styles.portfolio__container}>
      <div className={styles.portfolio__left}>
        Left
        <div className={styles.portfolio__chart__container}>
          <Chart />
        </div>
<<<<<<< HEAD
        <div className={styles.buyingpower__container}>Buying Power</div>
        <div className={styles.news__container}>
          <Article articles={articles} />
=======
        <div className={styles.chart__control}></div>
        <div className={styles.buyingpower__container}>buying power:
          {F(cash_balance)}</div>
        <div className={styles.news__container}>
        {Object.values(articles).map((article) => (
            <Article article={article} />
          ))}
>>>>>>> main
        </div>
      </div>
      <div className={styles.portfolio__right}>
      <div className={styles.listTitle}><h2>Owned</h2></div>
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
