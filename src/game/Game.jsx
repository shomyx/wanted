import React, { useState, useEffect, useRef } from 'react';

import * as Animations from './Animations';
import * as Config from './Config';
import { GameStats } from './components/GameStats';
import { Message } from './components/Message';
import './css/Game.scss';
import shoot_sound from '../assets/sounds/shoot.mp3';
import prep_sound from '../assets/sounds/prepare.mp3';

const choiceObj = {
  choice: null,
  balance: Config.START_BALANCE,
};

const outcomeObj = {
  outcome: null,
  win: 0,
};

const shootSound = new Audio(shoot_sound);
const prepSound = new Audio(prep_sound);

export const Game = () => {
  const [outcome, setOutcome] = useState(choiceObj);
  const [result, setResult] = useState(outcomeObj);
  const [collect, setCollect] = useState(false);

  let weed = useRef(null);
  let hat = useRef(null);

  useEffect(() => {
    if (outcome.choice) {
      prepSound.play();
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
    console.log(shootSound.play());
    setResult({
      outcome: outcome,
      win: win,
    });
  };

  const collectWin = () => setCollect(true);

  const onCollectDone = (balance) => {
    setTimeout(() => {
      Animations.clearAnimations(weed, hat);
      setCollect(false);
      setOutcome({ ...choiceObj, balance: balance });
      setResult({...outcomeObj});
    }, 1000);
  };

  const onLostDone = () => {
    Animations.clearAnimations(weed, hat);
    setResult({...outcomeObj});
  };

  const playOutcome = () => {
    if (!result.outcome) {
      return;
    }
    if (result.outcome === 'won') {
      Animations.flyAway(hat, outcome.choice, collectWin);
    } else {
      Animations.showBulletHoles(onLostDone);
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
      <Message status={result.outcome}/>
      <GameStats
        className="stats win-amount"
        value={result.win}
        collect={collect}
        animTo={0}
      />
      <GameStats
        className="stats balance"
        value={outcome.balance}
        collect={collect}
        animTo={outcome.balance + Config.ON_WIN}
        onChange={onCollectDone}
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
		</div>
	);
};