import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  editOneAsset,
  getAllAssets,
  deleteOneAsset,
  createOneAsset,
} from "../../store/assets";
import {
  createATransaction,
  getAllTransactions,
} from "../../store/transactions";
import { authenticate } from "../../store/session";
import { usePurchased } from "../../context/PurchasedContext";
import { useOwned } from "../../context/OwnedContext";
import { usePrices } from "../../context/PricesContext";
import F, { F4 } from "../../utils/formatter";
import styles from "./Transaction.module.css";
import { BeatLoader } from "react-spinners";

export default function Transaction({
  planetId,
  planetName,
  ticker,
  planetCrypto,
}) {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets);
  const userId = useSelector((state) => state.session.user.id);
  const userCash = useSelector((state) => state.session.user.cash_balance);
  const { purchased, setPurchased } = usePurchased();
  const { setPricesCtxt } = usePrices();
  const { ownedCtxt, setOwnedCtxt } = useOwned();
  const [justBought, setJustBought] = useState({});
  const [update, setUpdate] = useState(false);
  const [amount, setAmount] = useState("");
  const [orderType, setOrderType] = useState("");
  const [prices, setPrices] = useState({});
  const [currPrice, setCurrPrice] = useState(0);
  const [confirm, setConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // price is pulled from PRICES STATE OBJECT updated from raspberry route
    let assetPrice = prices[planetName.toLowerCase()].price;
    let asset = Object.values(assets);
    let number;
    let found = asset.find(
      (el) => el["planetId"] === +planetId && el["userId"] === userId
    )
      ? asset.find(
          (el) => el["planetId"] === +planetId && el["userId"] === +userId
        )
      : null;
    //! FOUND
    if (found) {
      // already OWN this ASSET -------------------------------------
      if (orderType === "sell") {
        // SELL && FOUND -----------------------------
        if (amount * 1 === found.shares) {
          // SELL ALL -------------------------
          let totalPrice = amount * 1 * assetPrice;
          number = amount * 1; // normalize
          let transPrice = number * assetPrice; // price for trans records
          dispatch(deleteOneAsset(found.id, totalPrice))
            .then(() => dispatch(getAllAssets()))
            .then(() => setPurchased(assets))
            .then(() => setUpdate(!update));

          dispatch(
            createATransaction(transPrice, +planetId, number, orderType)
          );
          setAmount("");
          setOwnedCtxt("1");
          return;
        } else if (amount > found.shares) {
          // X SELL more than OWNED X ----------
          window.alert("You don't own that many shares.");
          setAmount("");
          return; // kill
        }
        let totalPrice = amount * 1 * assetPrice; // price of shares
        number = amount * -1; // normalize
        let transPrice = number * -1 * assetPrice; // price for trans records
        dispatch(editOneAsset(found.id, number, totalPrice))
          .then(() => dispatch(getAllAssets()))
          .then(() => setUpdate(!update));

        dispatch(
          createATransaction(transPrice, +planetId, number * -1, orderType)
        );
        setAmount("");
        return;
      } else if (orderType === "buy") {
        // BUY && FOUND ------------------------
        let totalPrice = amount * assetPrice * -1;
        number = amount * 1; // normalize
        let transPrice = number * assetPrice; // price for trans records

        if (userCash >= transPrice) {
          // checking for enough cash
          dispatch(editOneAsset(found.id, number, totalPrice))
            .then(() => dispatch(getAllAssets()))
            .then(() => setUpdate(!update));

          dispatch(
            createATransaction(transPrice, +planetId, number, orderType)
          );
          setPurchased({ planetId: planetId });
          setAmount("");
          return;
        } else {
          // X NOT ENOUGH CASH X
          alert("You don't have the buying power");
          setAmount("");
          return; // kill
        }
      }
      //!NOT FOUND---------------------------
    } else if (orderType === "buy") {
      // BUY && NOT FOUND ---------------------------
      let totalPrice = amount * -1 * assetPrice;
      number = amount * 1; // normalize number to send
      let transPrice = number * assetPrice; // price for trans records
      if (userCash >= transPrice) {
        if (!("planetId" in purchased)) {
          // createOneAsset requires planet information to create from model
          dispatch(
            createOneAsset(
              number,
              +planetId,
              totalPrice,
              planetName,
              ticker,
              planetCrypto
            )
          )
            .then(() => dispatch(getAllAssets()))
            .then(() => setPurchased(assets))
            .then(() => setUpdate(!update));

          dispatch(
            createATransaction(transPrice, +planetId, number, orderType)
          );
          setPurchased({ planetId: planetId });
          setAmount("");
          return;
        } else {
          alert("please resubmit your order, there was a problem");
          setPurchased([]);
          dispatch(getAllAssets());
          setAmount("");
        }
      } else {
        // X NOT ENOUGH CASH X
        alert("You don't have the buying power");
        setAmount("");
        return; // kill
      }
    } else if (orderType === "sell") {
      // X SELL && NOT FOUND X -------------------
      alert("You don't have any to sell");
      setAmount("");
      return; // kill
    }
    return;
  };

  // raspberry route
  const getPrices = async () => {
    const data = await fetch("/api/raspberry/");
    const result = await data.json();
    await setPricesCtxt(result);
    return setPrices(result);
  };

  useEffect(() => {
    dispatch(authenticate());
  }, [update]);

  useEffect(() => {
    setCurrPrice(prices[planetName.toLowerCase()]?.price * amount);
    currPrice < 10
      ? setCurrPrice(F4(prices[planetName.toLowerCase()]?.price * amount))
      : setCurrPrice(F(prices[planetName.toLowerCase()]?.price * amount));
  }, [amount, setAmount, prices, setPrices]);

	useEffect(() => {

	})

  // on initial load
  useEffect(() => {
    dispatch(getAllAssets());
    dispatch(getAllTransactions());
    // setting interval to hit raspberry route
    const interval = setInterval(getPrices, 2000);
    // clearing interval on componentWillUnmount
    return () => clearInterval(interval);
  }, []);

  if (!prices) return null;
  return (
    <>
      <div className={styles.transaction__container}>
        <div className={styles.orderContainer}>
          <div className={styles.order}>Buy {planetName}</div>
        </div>
        <form
          className={styles.transactionForm}
          action=""
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={styles.shares}>
            <label>Shares:</label>
            <input
              className={styles.shareInput}
              type="number"
              value={amount}
              onChange={(e) =>
                e.target.value >= 0 ? setAmount(e.target.value) : setAmount(0)
              }
            />
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.priceCashContainer}>
              <div className={styles.price}>Market Price:</div>
              <div className={styles.number}>
                {" "}
                {prices[planetName.toLowerCase()]?.price ? (
                  prices[planetName.toLowerCase()]?.price < 10 ? (
                    F4(prices[planetName.toLowerCase()]?.price)
                  ) : (
                    F(prices[planetName.toLowerCase()]?.price)
                  )
                ) : (
                  <BeatLoader size={8} color="black" loading />
                )}
              </div>
            </div>
          </div>
          <div className={styles.costContainer}>
            <div className={styles.totalCost}>
              <div className={styles.price}>Estimated Cost: </div>
              <div className={styles.number}>
                {currPrice === "$NaN" ? "$0.00" : currPrice}
              </div>
            </div>
          </div>
          <div className={styles.transactionButtons}>
            <button
              onClick={() => setOrderType("buy")}
              disabled={
                amount > 0 && prices[planetName.toLowerCase()]?.price
                  ? false
                  : true
              }
            >
              Buy
            </button>
            <button
              onClick={() => setOrderType("sell")}
              disabled={
                amount > 0 && prices[planetName.toLowerCase()]?.price
                  ? false
                  : true
              }
            >
              Sell
            </button>
          </div>
          <div className={styles.availCash}>
            <div className={styles.price}>Available Balance:</div>
            <div className={styles.number}>{F(userCash)}</div>
          </div>
        </form>
      </div>
    </>
  );
}
