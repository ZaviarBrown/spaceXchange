import React, { useState, useEffect } from 'react';
import styles from './AllPlanets.module.css';
import { getAllPlanets } from '../../store/planet';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OnePlanet from '../OnePlanet/OnePlanet';

export default function AllPlanets() {
  const dispatch = useDispatch();

  const planets = useSelector((state) => Object.values(state.planet));
  const [prices, setPrices] = useState({})

  // console.log(prices)

  const getPrices = async () => {
    const data = await fetch('/api/raspberry/')
    const result = await data.json()
    return setPrices(result)
  }

  useEffect(() => {
    dispatch(getAllPlanets());
    const interval = setInterval(getPrices, 2000)
    // clearing interval on componentWillUnmount
    return () => clearInterval(interval)
  }, []);

  return (
    <>
      <div className={styles.allPlanetsPageContainer}>
        <div className={styles.planetsContainer}> 
          {planets.map((planet) => (
            <NavLink to={`/planet/${planet.id}`}>
              <OnePlanet planet={planet} prices={prices}></OnePlanet>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
