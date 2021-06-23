import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlanet } from '../../store/planet';
import Article from '../articles/Article';


function Planet() {
  const planet = useSelector((state) => state.planet.planet);
  const dispatch = useDispatch();
  const { planetId } = useParams();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    dispatch(getOnePlanet(planetId));
  }, [dispatch]);

  const getArticles = async () => {
    const data = await fetch('/api/article');
    const result = await data.json();
    return setArticles(result)
  }

  useEffect(() => {
    getArticles();
  }, [])

  return (
    <>
      <div>
        <h1>{planet?.name}</h1>
        <div>{planet?.description}</div>
        <div>{planet?.labor_force}</div>
        <div>{planet?.price}</div>
      </div>
      <div>
        <Article articles={articles}/>
      </div>
    </>
  );
}

export default Planet;
