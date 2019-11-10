import React, { useState, useEffect } from 'react';

export const GameStats = ({ value, className, collect }) => {
	const [stats, setStats] = useState(0);

  useEffect(() => {
    setStats(value);
  }, [value]);

  useEffect(() => {
    doCollect();
  }, [collect]);

  const doCollect = () => {
    if (collect) {
      console.log("Collecting...");
    }
  };

  return <span className={className} >{stats}</span>;
};