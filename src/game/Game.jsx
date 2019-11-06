import React, { useState, useEffect, useRef } from 'react';
import { TweenMax, TimelineLite, Linear } from 'gsap';

import './Game.scss';

export const Game = () => {
  const [result, setResult] = useState(null);
  const [choice, setChoice] = useState(null);

  let weed = useRef(null);
	let hat = useRef(null);

  useEffect(() => {
    playOutcome();
  }, [result]);

  useEffect(() => {
    if (choice) {
      rollTheWeed();
    }
  }, [choice]);

  let animations = new TimelineLite({ paused: true });

  const shoot = () => {
    const rand = Math.floor(Math.random() * 10) + 1;
    const outcome = (rand > 5) ? 'won' : 'lost';
    setResult(outcome);
  };

  const playOutcome = () => {
    if (!result) {
      return;
    }
    if (result === 'won') {
      flyTheHat();
    } else {
      // alert("YOU'VE LOST");
    }
  };

  const rollTheWeed = () => {
  	animations
  		.to(weed, 1, {
      	repeat: -1,
      	rotation: -360,
      	ease: Linear.easeNone
    	})
    	.to(weed, 5, {
        x: -1000,
        ease: Linear.easeNone,
      }, 0)
      .to(weed, 0, {
        x: 0,
        ease: Linear.easeNone,
        delay: 2,
        onComplete: () => {
        	animations.clear();
          shoot();
        },
      })
      .play();
  };

  const getHatSettings = () => {
    const settings = {};

    switch (choice) {
      case 'left':
        settings.path = [{x:0, y:0}, {x:100, y:-50}, {x:200, y:-80}, {x:300, y:-100}, {x:500, y:-120}];
        settings.rotation = 360;
        break;
      case 'right':
        settings.path = [{x:0, y:0}, {x:-100, y:-50}, {x:-200, y:-80}, {x:-300, y:-100}, {x:-500, y:-120}];
        settings.rotation = -360;
        break;
      default:
        settings.path = [];
        settings.rotation = 0;
    }

    return settings;
  };

  const flyTheHat = () => {
    const params = getHatSettings();
    animations
      .to(hat, 1.5, {
        bezier:{curviness: 3, values: params.path},
        scale: 0.3,
        ease:Linear.easeOut,
        onComplete: () => animations.stop(),
      })
      .to(hat, 1, {
        repeat: -1,
        rotation: params.rotation,
        ease: Linear.easeNone
      },'-=1.5');
    animations.play();
  };

	return (
		<div className="game">
			<div className="bullets"></div>
			<div
        className="hat"
        ref={elem => hat = elem}
      ></div>
			<div className={`cowboy ${result ? result : 'idle'}`}></div>
			<div className="guns">
				<div
					className="gun left-gun"
					onClick={() => setChoice('left')}
				></div>
				<div
					className="gun right-gun"
          onClick={() => setChoice('right')}
				></div>
			</div>
			<div
			  className="tumbleweed"
			  ref={elem => weed = elem}
			 ></div>
		</div>
	);
};