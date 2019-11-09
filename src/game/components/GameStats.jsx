import React, { useState, useEffect } from 'react';

export const GameStats = ({ value, className }) => {
	const [stats, setStats] = useState(0);

  useEffect(() => {
    setStats(value);
  }, [value]);

  return <span className={className} >{stats}</span>;
};