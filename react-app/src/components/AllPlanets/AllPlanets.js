import React, { useEffect } from 'react';
import styles from './AllPlanets.module.css';
import { getAllPlanets } from '../../store/planet';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function AllPlanets() {
  const dispatch = useDispatch();

  const planets = useSelector((state) => Object.values(state.planet));
  console.log(planets);

  useEffect(() => {
    dispatch(getAllPlanets());
  }, []);

  return (
    <>
      <div>
        <div className={styles.planetsContainer}>
          <div>
            {planets.map((planet) => (
              <NavLink to={`/planet/${planet.id}`}>
                <h1>{planet.name}</h1>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
