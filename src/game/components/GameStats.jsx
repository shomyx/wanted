import React, { useState, useEffect, useRef } from 'react';

export const GameStats = ({ value, className }) => {
	const [stats, setStats] = useState(0);
  let amount = useRef(null);

  useEffect(() => {
    setStats(value);
  }, [value]);

  return (
    <span
      className={className}
      ref={elem => amount = elem}
    >
      {stats}
    </span>
  );
};