import React, { useState, useRef, useEffect } from "react";


const GameEngine = () => {
  const [clock, setClock] = useState(0);
  const intervalRef = useRef();

  
  useEffect(()=>{
    return clearInterval(intervalRef)
  })

  const startClock = () => {
    const gameInterval = setInterval(() => {
      setClock(prevTick => prevTick + 10);
    }, 10);
    intervalRef.current = gameInterval;
    return () => clearInterval(intervalRef.current);
  };

  const stopClock = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div className="bson-flex">
      <h3>Time: {clock}</h3>
      <button className="bson-button m-n" onClick={()=>startClock()} >Start clock</button>
      <button className="bson-button" onClick={()=>stopClock()} >Stop clock</button>
    </div>
  );
};

export default GameEngine;
