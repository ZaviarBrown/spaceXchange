import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlanet } from '../../store/planet';
import Article from '../articles/Article';

import Transaction from '../Transaction/Transaction';

function Planet() {
  const planet = useSelector((state) => state.planet);
  // const { planet } = planetO
  const dispatch = useDispatch();
  const { planetId } = useParams();
  // console.log("HELLO", planet[planet]?.description)
  // console.log(planet)

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
      <div>
        <h1>{planet[planet]?.name}</h1>
        <div>{planet[planet]?.description}</div>
        <div>{planet[planet]?.labor_force}</div>
        <div>{planet[planet]?.price}</div>
      </div>
      <div>
        <Article articles={articles} />
      </div>
      <div>
        <Transaction planetId={planetId} />
      </div>
    </>
    // if (!planet) return null
    //   return (
    //     <div>
    //       <h1>{planet[planet]?.name}</h1>
    //       <div>{planet[planet]?.description}</div>
    //       <div>{planet[planet]?.labor_force}</div>
    //       <div>{planet[planet]?.price}</div>
    //       <div>
    //         <Transaction planetId={planetId}/>
    //       </div>
    //     </div>
  );
}

export default Planet;
