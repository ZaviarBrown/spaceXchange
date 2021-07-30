import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import ChartForPortfolio from "../Chart/ChartForPortfolio";
import styles from "./Portfolio.module.css";
import OwnedList from "../OwnedList/OwnedList";
import { authenticate } from "../../store/session";
import { getAllAssets } from "../../store/assets";
import { getAllTransactions } from "../../store/transactions";
import { useArticles } from "../../context/ArticlesContext";
import { usePrices } from "../../context/PricesContext";
import { useHistory } from "../../context/HistoryContext";
import Article from "../articles/Article";
import F from "../../utils/formatter";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";

export default function Portfolio() {
  const cash_balance = useSelector((state) => state.session.user.cash_balance);
  const ownedAssetsObject = useSelector((state) => state.assets);
  const ownedAssets = useSelector((state) => Object.values(state.assets));

  const [accountValue, setAccountValue] = useState("Fetching...");
  const { historyCtxt, setHistoryCtxt } = useHistory();
  const { articlesCtxt, setArticlesCtxt } = useArticles();
  const { pricesCtxt, setPricesCtxt } = usePrices();
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  //! for portfolio calc

  const getArticles = async () => {
    const data = await fetch("/api/article/");
    const result = await data.json();
    return setArticlesCtxt(result);
  };

  // raspberry route
  const getPrices = async () => {
    const data = await fetch("/api/raspberry/");
    const result = await data.json();
    setPricesCtxt(result);
    setLoaded(true);
  };

  const getHistory = async () => {
    let startData = [
      { name: "9 days ago", value: 481230.58 },
      { name: "8 days ago", value: 491898.26 },
      { name: "7 days ago", value: 96902.54 },
      { name: "6 days ago", value: 96902.96 },
      { name: "5 days ago", value: 94201.31 },
      { name: "4 days ago", value: 439387.71 },
      { name: "3 days ago", value: 439394.75 },
      { name: "2 days ago", value: 439400.85 },
      { name: "1 days ago", value: 319845.93 },
    ];
    if (!localStorage.getItem("history")) {
      await localStorage.setItem("history", JSON.stringify(startData));
      setHistoryCtxt(startData);
    } else if (localStorage.getItem("history")) {
      let history = await JSON.parse(localStorage.getItem("history"));

      accountValue > 0 && history.shift();
      let name = new Date(Date.now()).toString().split(" ")[4];
      accountValue > 0 &&
        loaded &&
        history.push({ name: name, value: accountValue.toFixed(2) });
      loaded && localStorage.setItem("history", JSON.stringify(history));
      setHistoryCtxt(history);
    }
  };

  const getAccountValue = async () => {
    let accountValue = 0;
    let ownedObject = {};

    ownedAssets &&
      pricesCtxt &&
      loaded &&
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
    getArticles();
    dispatch(authenticate());
    dispatch(getAllAssets());
    dispatch(getAllTransactions());
    const interval = setInterval(getPrices, 2000);
    // clearing interval on componentWillUnmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getAccountValue().then(() => getHistory());
  }, [pricesCtxt]);

  return (
    <div className={styles.portfolio__container}>
      <div className={styles.portfolio__left}>
        <div className={styles.data__wrapper}>
          <div>Account Value: </div>
          {ownedAssets.length > 0 ? (
            accountValue === 0 ? (
              <div className={styles.spinner__container}>
                <PulseLoader size={15} color="white" loading />
              </div>
            ) : (
              <div className={styles.account__value}>{F(accountValue)}</div>
            )
          ) : (
            0
          )}
        </div>
        <div className={styles.cash__balance}>
          Buying Power: {F(cash_balance)}
        </div>
        <div className={styles.portfolio__chart__container}>
          <ChartForPortfolio history={historyCtxt} />
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
            <h2>Your Assets</h2>
          </div>
          <div className={styles.listContainer}>
            {ownedAssets && pricesCtxt && loaded && (
              <div>
                {ownedAssets.length === 0 ? (
                  <p className={styles.noAssets}>No assets to display</p>
                ) : null}
                {ownedAssets.map((asset) => {
                  let price = pricesCtxt[asset?.planetName.toLowerCase()];
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
