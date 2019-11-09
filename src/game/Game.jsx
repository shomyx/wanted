import React, { useState, useEffect, useRef } from 'react';
import { TweenMax, Power1 } from 'gsap';

import * as Animations from './Animations';
import * as Config from './Config';
import { GameStats } from './components/GameStats';
import './Game.scss';

let _count = {val: 0};

export const Game = () => {
  const [test, setTest] = useState(0);

  useEffect(() => {
    TweenMax.to(_count, 2, {
      val:10,
      onUpdate: () => setTest(_count.val.toFixed(0)),
      ease: Power1.easeOut,
    });
  });

  const choiceObj = {
    choice: null,
    balance: Config.START_BALANCE,
  };

  const outcomeObj = {
    outcome: null,
    win: 0,
  };
  
  const [outcome, setOutcome] = useState(choiceObj);
  const [result, setResult] = useState(outcomeObj);

  let weed = useRef(null);
  let hat = useRef(null);
  let win = useRef(null);
	let balance = useRef(null);

  useEffect(() => {
    if (outcome.choice) {
      Animations.rotateAndMove(weed, shoot);
    }
  }, [outcome]);

  useEffect(() => {
    playOutcome();
  }, [result]);

  const shoot = () => {
    const rand = Math.floor(Math.random() * 10) + 1;
    const outcome = (rand > 5) ? 'won' : 'lost';
    const win = (rand > 5) ? Config.ON_WIN : 0;
    
    setResult({
      outcome: outcome,
      win: win,
    });
  };

  const playOutcome = () => {
    if (!result.outcome) {
      return;
    }
    if (result.outcome === 'won') {
      Animations.flyAway(hat, outcome.choice);
    } else {
      // alert("YOU'VE LOST");
    }
  };

  const prepareOutcome = (choice) => {
    const newState = { ...outcome };

    newState.choice = choice;
    newState.balance = newState.balance - Config.ROUND_FEE;

    setOutcome(newState);
  };

	return (
		<div className="game">
      <GameStats
        className="stats win-amount"
        value={result.win}
      />
      <GameStats
        className="stats balance"
        value={outcome.balance}
      />

			<div className="bullets"></div>

			<div
        className="hat"
        ref={elem => hat = elem}
      ></div>

			<div className={`cowboy ${result.outcome ? result.outcome : 'idle'}`}></div>

			<div className="guns">
				<div
					className="gun left-gun"
					onClick={() => prepareOutcome('left')}
				></div>
				<div
					className="gun right-gun"
          onClick={() => prepareOutcome('right')}
				></div>
			</div>

			<div
			  className="tumbleweed"
			  ref={elem => weed = elem}
			 ></div>

    <span>{test}</span>

		</div>
	);
};