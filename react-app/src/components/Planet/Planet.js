import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import planet, { getOnePlanet } from "../../store/planet"

function Planet(){

  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(()=>{
    dispatch(getOnePlanet(id))
  }, [dispatch])

return (
  // <div>{planet.description}</div>
  <div>
  <h1>Is this working?</h1>
  </div>
)

}

export default Planet