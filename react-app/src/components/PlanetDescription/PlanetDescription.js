import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlanet } from '../../store/planet';
import Article from '../articles/Article';
import Chart from '../Chart/Chart';

import styles from './PlanetDescription.module.css';

import Transaction from '../Transaction/Transaction';

function Planet() {
  const planet = useSelector((state) => state.planet);

  const dispatch = useDispatch();
  const { planetId } = useParams();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    dispatch(getOnePlanet(planetId));
  }, [dispatch]);

  const getArticles = async () => {
    const data = await fetch('/api/article');
    const result = await data.json();
    return setArticles(result);
  };

  useEffect(() => {
    getArticles();
  }, []);
  if (!planet) return null;
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.pageLeft}>
          <div className={styles.planetContainer}>
            <div className={styles.nameContainer}>
              <h1>{planet[planet]?.name}</h1>
            </div>
            <div className={styles.chartContainer}>
              <Chart></Chart>
            </div>
            <div className={styles.underline}>
              <h2>About</h2>
            </div>
            <p>{planet[planet]?.description}</p>
            <div>
              <section className={styles.underline}>
                <header>
                  <h2>Key Statistics</h2>
                </header>
              </section>
            </div>
            <div className={styles.statistics}>
              <p>Labor Force: {planet[planet]?.labor_force}</p>
              <p>Price: {planet[planet]?.price}</p>
            </div>
          </div>

          <Article articles={articles} />
        </div>
        <div className={styles.pageRight}>
          <div>
            <Transaction planetId={planetId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Planet;
