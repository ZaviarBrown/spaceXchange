import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListItems } from '../../store/ownedList';
import styles from './OwnedList.module.css';

export default function OwnedList({ asset }) {
  const assets = useSelector(state => state.ownedList);
  return (
    <div>
      <div>{asset.planetName}</div>
    </div>
  );
}
