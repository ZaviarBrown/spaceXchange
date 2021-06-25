import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlanet } from '../../store/planet';
import Article from '../articles/Article';
import RecordDisplay from '../RecordDisplay/RecordDisplay'
import Chart from '../Chart/Chart';
import F from '../../utils/formatter'
import styles from './PlanetDescription.module.css'

import Transaction from '../Transaction/Transaction';

export default function Planet() {
  let planet = useSelector((state) => state.planet)
  const dispatch = useDispatch()
  const { planetId } = useParams()
  planet = planet[planetId]
  const [articles, setArticles] = useState([])

  const getArticles = async () => {
    const data = await fetch('/api/article/')
    const result = await data.json()
    return setArticles(result)
  };
  
  useEffect(() => {
    dispatch(getOnePlanet(planetId));
    getArticles();
  }, [dispatch])

  console.log(articles)

  if (!planet) return null
  if (articles.length === 0) return null

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.pageLeft}>
          <div className={styles.planetContainer}>
            <div className={styles.nameContainer}>
              <h1>{planet.name}</h1>
            </div>
            <div className={styles.chartContainer}>
              <Chart></Chart>
            </div>
            <div className={styles.underline}>
              <h2>About</h2>
            </div>
            <p>{planet.description}</p>
            <div>
              <section className={styles.underline}>
                <header>
                  <h2>Key Statistics</h2>
                </header>
              </section>
            </div>
            <div className={styles.statistics}>
              <p>Labor Force: {planet.labor_force}</p>
              <p>Price: {planet.price}</p>
            </div>
          </div>
          {Object.values(articles).map((article) => (
            <Article article={article} />
          ))}
        </div>
        <div className={styles.pageRight}>
          <div>
            <Transaction planetId={planetId} planetName={planet.name} ticker={planet.ticker} />
          </div>
        </div>
      </div>
    </>
  );
}
