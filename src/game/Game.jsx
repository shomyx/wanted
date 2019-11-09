import React, { useState, useEffect, useRef } from 'react';

import * as Animations from './Animations';
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
      Animations.rotateAndMove(weed, shoot);
    }
  }, [choice]);

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
      Animations.flyAway(hat, getHatSettings());
    } else {
      // alert("YOU'VE LOST");
    }
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