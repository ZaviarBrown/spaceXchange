import React, { useEffect } from 'react';
import styles from './AllPlanets.module.css';
import { getAllPlanets } from '../../store/planet';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OnePlanet from '../OnePlanet/OnePlanet';

export default function AllPlanets() {
  const dispatch = useDispatch();

  const planets = useSelector((state) => Object.values(state.planet));

  useEffect(() => {
    dispatch(getAllPlanets());
  }, []);

  return (
    <>
      <div className={styles.allPlanetsPageContainer}>
        <div className={styles.planetsContainer}>
          {planets.map((planet) => (
            <NavLink to={`/planet/${planet.id}`}>
              <OnePlanet planet={planet}></OnePlanet>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
