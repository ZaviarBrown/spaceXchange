import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlanet } from '../../store/planet';

function Planet() {
  const planet = useSelector((state) => state.planet.planet);
  const dispatch = useDispatch();
  const { planetId } = useParams();

  useEffect(() => {
    dispatch(getOnePlanet(planetId));
  }, [dispatch]);

  return (
    <div>
      <h1>{planet?.name}</h1>
      <div>{planet?.description}</div>
      <div>{planet?.labor_force}</div>
      <div>{planet?.price}</div>
    </div>
  );
}

export default Planet;
