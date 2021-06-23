import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListItems } from '../../store/ownedList';
import styles from './OwnedList.module.css';

export default function OwnedList({asset}) {
  const dispatch = useDispatch();

  const assets = useSelector(state => state.ownedList);
  const userId = useSelector(state => state.session.user.id);

  useEffect(() =>{
    dispatch(getListItems())
  }, [])

  const { id, planetId, shares } = assets

  // console.log(assets)
  // console.log(Object.values(assets))
  
  return (
    <div>
      <h1>{asset.planetName}</h1>
    </div>
  );
}
