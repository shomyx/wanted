import React, { useEffect, useRef } from 'react';
import { TweenMax, TimelineLite, Linear } from 'gsap';

import './Game.scss';

export const Game = () => {
	let weed = useRef(null);

	useEffect(() => {
  	setupAnimations();
	}, []);

  let animations = new TimelineLite({ paused: true });

  const setupAnimations = () => {
  	animations.to(weed, 1, {
        repeat: -1,
        rotation: -360,
        ease: Linear.easeNone
      }
    ).to(weed, 5, {
        x: -1000,
        ease: Linear.easeNone
      }
    );
  };

  const start = () => animations.play();
  
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