import React, { useEffect, useRef } from 'react';
import { TweenMax, TimelineLite, Linear } from 'gsap';

import './Game.scss';

export const Game = () => {
	let weed = useRef(null);

  let animations = new TimelineLite({ paused: true });

  const rollTheWeed = () => {
  	return new Promise((resolve) => {
	  	animations.to(weed, 1, {
	        repeat: -1,
	        rotation: -360,
	        ease: Linear.easeNone
	      }
	    ).to(weed, 5, {
	        x: -1000,
	        ease: Linear.easeNone,
	      }
	    ).to(weed, 0, {
	        x: 0,
	        ease: Linear.easeNone,
	        onComplete: () => {
	        	animations.clear();
	        	resolve();
	        },
	      }
	    ).play();
  	});
  };

  const startAnimation = async () => {
  	await rollTheWeed();
  	alert('Bla');
  };

  const start = () => startAnimation();
  
  const pause = () => animations.stop();

	return (
		<div className="game">
			<div className="bullets"></div>
			<div className="hat"></div>
			<div className="cowboy"></div>
			<div className="guns">
				<div
					className="gun left-gun"
					onClick={start}
				></div>
				<div
					className="gun right-gun"
					onClick={pause}
				></div>
			</div>
			<div
			  className="tumbleweed"
			  ref={elem => weed = elem}
			 ></div>
		</div>
	);
};