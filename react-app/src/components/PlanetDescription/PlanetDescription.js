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
  const dispatch = useDispatch()
  const [articles, setArticles] = useState([])
  const { planetId } = useParams()
  let planet = useSelector((state) => state.planet)
  planet = planet[planetId]

  const getArticles = async () => {
    const data = await fetch('/api/article/')
    const result = await data.json()
    return setArticles(result)
  };

  useEffect(() => {
    dispatch(getOnePlanet(planetId));
    getArticles();
  }, [dispatch, planetId])

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
              <Chart crypto={planet.crypto} />
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
              <p>Planet Leader: {planet.planet_leader}</p>
              <p>Top Export: {planet.top_export}</p>
              <p>Labor Force: {planet.labor_force}</p>
            </div>
          </div>
          <div className={styles.news}>
            <h2>Recent News</h2>
          {Object.values(articles).map((article) => (
            <Article key={article.title} article={article} />
          ))}
          </div>
        </div>
        <div className={styles.pageRight}>
          <div>
            <Transaction planetId={planetId} planetName={planet.name} ticker={planet.ticker} planetCrypto={planet.crypto} />
          </div>
        </div>
      </div>
    </>
  );
}
