import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListItems } from '../../store/ownedList';
import styles from './OwnedList.module.css';

export default function OwnedList({asset}) {
  const dispatch = useDispatch();

  const assets = useSelector(state => state.ownedList);
  

  useEffect(() =>{
    dispatch(getListItems())
  }, [])

  // console.log(assets)
  // console.log(Object.values(assets))
  
  return (
    <div>
      <div>{asset.planetName}</div>
    </div>
  );
}
