import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlanet } from '../../store/planet';
import Article from '../articles/Article';
import RecordDisplay from '../RecordDisplay/RecordDisplay'
import Chart from '../Chart/Chart';

import Transaction from '../Transaction/Transaction';

export default function Planet() {
  let planet = useSelector((state) => state.planet)
  const dispatch = useDispatch()
  const { planetId } = useParams()
  planet = planet[planetId]
  const [articles, setArticles] = useState([])

  useEffect(() => {
    dispatch(getOnePlanet(planetId))
  }, [dispatch])

  const getArticles = async () => {
    const data = await fetch('/api/article')
    const result = await data.json()
    return setArticles(result)
  };

  useEffect(() => {
    getArticles();
  }, []);
  if (!planet) return null
  return (
    <>
      <Chart />
      <div>
        <h1>{planet.name}</h1>
        <div>{planet.description}</div>
        <div>{planet.labor_force}</div>
        <div>{planet.price}</div>
      </div>
      <div>
        <Article articles={articles} />
      </div>
      <div>
        <Transaction planetId={planetId} planetName={planet.name} ticker={planet[planet]?.ticker} />
      </div>
    </>
  );
}

