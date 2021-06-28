import React, { useState, useEffect } from "react";
import styles from "./AllTransactions.module.css";
import { getAllTransactions } from "../../store/transactions";
import { getAllPlanets } from "../../store/planet";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OneTransaction from "../OneTransaction/OneTransaction";

export default function AllTransactions() {
  const dispatch = useDispatch();

  const transactions = useSelector((state) =>
    Object.values(state.transactions)
  );
  const planets = useSelector((state) => Object.values(state.planet));

  console.log(planets);
  console.log(transactions);

  useEffect(() => {
    dispatch(getAllTransactions());
    dispatch(getAllPlanets());
  }, []);

  return (
    <>
      <div className={styles.transactionsPageContainer}>
        <div className={styles.transactionsContainer}>
          <div className={styles.pageTitle}>
            <h1>All Previous Transactions</h1>
          </div>
          <div>
            {transactions.reverse().map((t) => (
              <NavLink to={`/planet/${t.planetId}`}>
                <OneTransaction t={t} planets={planets} />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
