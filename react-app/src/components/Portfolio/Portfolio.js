import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ChartForPortfolio from '../Chart/ChartForPortfolio'
import styles from './Portfolio.module.css'
import OwnedList from '../OwnedList/OwnedList'
import { authenticate } from '../../store/session'
import { getAllAssets } from '../../store/assets'
import { getAllTransactions } from '../../store/transactions'
import { useArticles } from '../../context/ArticlesContext'
import { usePrices } from '../../context/PricesContext'
import Article from '../articles/Article'
import F, { F2 } from '../../utils/formatter'

export default function Portfolio() {
  const cash_balance = useSelector((state) => state.session.user.cash_balance);
  const ownedAssetsObject = useSelector((state) => state.assets);
  const ownedAssets = useSelector((state) => Object.values(state.assets));

  const [assets, setAssets] = useState(ownedAssets);
  const [accountValue, setAccountValue] = useState('Fetching...');
  const planets = useSelector((state) => Object.values(state.planet));

  const { articlesCtxt, setArticlesCtxt } = useArticles();
  const { pricesCtxt, setPricesCtxt } = usePrices();
  const [history, setHistory] = useState([])
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch();
  //! for portfolio calc
  const [totalsArr, setTotalsArr] = useState([])

  const getArticles = async () => {
    const data = await fetch('/api/article');
    const result = await data.json();
    return setArticlesCtxt(result);
  };

  // raspberry route
  const getPrices = async () => {
    const data = await fetch('/api/raspberry/')
    const result = await data.json()
    setPricesCtxt(result)
    setLoaded(true)

  }

  const getHistory = async () => {
    let startData = [
      { "name": "9 days ago", "value": 481230.58 },
      { "name": "8 days ago", "value": 491898.26 },
      { "name": "7 days ago", "value": 96902.54 },
      { "name": "6 days ago", "value": 96902.96 },
      { "name": "5 days ago", "value": 94201.31 },
      { "name": "4 days ago", "value": 439387.71 },
      { "name": "3 days ago", "value": 439394.75 },
      { "name": "2 days ago", "value": 439400.85 },
      { "name": "1 days ago", "value": 319845.93 },
    ]
    if (!localStorage.getItem('history')) {
      localStorage.setItem('history', JSON.stringify(startData))
      setHistory(startData)
    }
    else if (localStorage.getItem('history')) {
      let history = localStorage.getItem('history')
      history.shift()
      history.push(accountValue)
      localStorage.setItem('history', JSON.stringify(history))
    }
    setHistory(history)
  }

}

const getAccountValue = async () => {
  let accountValue = 0;
  let ownedObject = {};

  ownedAssets && pricesCtxt && loaded && ownedAssets.forEach((asset) => {
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
  getArticles();
  dispatch(authenticate())
  dispatch(getAllAssets())
  dispatch(getAllTransactions());
  const interval = setInterval(getPrices, 2000);
  const historyInterval = setInterval(getHistory, 5000)
  // clearing interval on componentWillUnmount
  return () => {
    clearInterval(historyInterval)
    clearInterval(interval)
  };
}, []);

useEffect(() => {
  getAccountValue();
}, [pricesCtxt]);

return (
  <div className={styles.portfolio__container}>
    <div className={styles.portfolio__left}>
      <h1>Your Portfolio</h1>
      <div className={styles.portfolio__chart__container}>
        {
          history &&
          <ChartForPortfolio history={history} />
        }
      </div>
      <div className={styles.chart__control}></div>
      <div className={styles.buyingpower__container}>
        <div className={styles.statsContainer}>
          Stats
          <div>Buying Power: {F(cash_balance)}</div>
          <div>Account Value: {accountValue === 0 ? "...fetching" : F(accountValue)} </div>
        </div>
      </div>
      <div className={styles.news__container}>
        <h1>Recent News</h1>
        {Object.values(articlesCtxt).map((article) => (
          <Article article={article} key={article.title} />
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
          {ownedAssets && pricesCtxt && loaded && (
            <div>
              {ownedAssets.map((asset) => {
                let price = pricesCtxt[asset?.planetName.toLowerCase()]
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
