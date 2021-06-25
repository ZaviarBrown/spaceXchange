import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Chart from '../Chart/Chart';
import styles from './Portfolio.module.css';
import OwnedList from '../OwnedList/OwnedList';
import { getListItems } from '../../store/ownedList';
import Article from '../articles/Article';

export default function Portfolio() {
  const cash_balance = useSelector((state) => state.session.user.cash_balance);
  const ownedAssets = useSelector((state) => Object.values(state.ownedList));
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

  // console.log('OWNED ASSETS', ownedAssets);

  return (
    <div className={styles.portfolio__container}>
      Portfolio test
      <div className={styles.portfolio__left}>
        Left
        <div className={styles.portfolio__chart__container}>
          <Chart />
        </div>
        <div className={styles.chart__control}>Chart controls</div>
        <div className={styles.buyingpower__container}>buying power</div>
        <div className={styles.news__container}>
          <Article articles={articles} />
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
