import React, { useState, useEffect, memo } from 'react';
import { TweenMax, Power1 } from 'gsap';

import * as Animations from '../Animations';

export const GameStats = memo(({
  value,
  className,
  collect,
  animTo,
  onChange,
}) => {
  const [stats, setStats] = useState(0);
	const [anim, setAnim] = useState({val: value});

  useEffect(() => {
    setStats(value);
    setAnim({val: value});
  }, [value]);

  useEffect(() => {
    doCollect();
  }, [collect]);

  const doCollect = () => {
    if (collect) {
      console.log("Collecting...");
      Animations.animateNumber(anim, animTo, setStats, onChange);
    }
  };

  return <span className={className} >{stats}</span>;
});