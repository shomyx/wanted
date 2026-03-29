import { useState, useEffect, useRef, useCallback } from "react";

import * as Animations from "./Animations";
import * as Config from "./Config";
import { GameStats } from "./components/GameStats";
import { Message } from "./components/Message";
import { MessageWithAction } from "./components/MessageWithAction";

import "./css/Game.scss";
import shoot_sound from "../assets/sounds/shoot.mp3";
import prep_sound from "../assets/sounds/prepare.mp3";

const INITIAL_CHOICE_STATE = {
  choice: null,
  balance: Config.START_BALANCE,
};

const INITIAL_OUTCOME_STATE = {
  outcome: null,
  win: 0,
};

export const Game = () => {
  const [outcome, setOutcome] = useState(INITIAL_CHOICE_STATE);
  const [result, setResult] = useState(INITIAL_OUTCOME_STATE);
  const [collect, setCollect] = useState(false);

  const weedRef = useRef(null);
  const hatRef = useRef(null);

  const shootSoundRef = useRef(null);
  const prepSoundRef = useRef(null);

  useEffect(() => {
    shootSoundRef.current = new Audio(shoot_sound);
    prepSoundRef.current = new Audio(prep_sound);

    return () => {
      shootSoundRef.current = null;
      prepSoundRef.current = null;
    };
  }, []);

  const shoot = useCallback(() => {
    shootSoundRef.current?.play();

    setResult(() => {
      const rand = Math.floor(Math.random() * 10) + 1;

      return {
        outcome: rand > 5 ? "won" : "lost",
        win: rand > 5 ? Config.ON_WIN : 0,
      };
    });
  }, []);

  const cleanUpState = useCallback(
    (balance) => {
      const newBalance = { balance: balance ?? outcome.balance };
      setOutcome({ ...INITIAL_CHOICE_STATE, ...newBalance });
      setResult({ ...INITIAL_OUTCOME_STATE });
    },
    [outcome.balance],
  );

  const collectWin = useCallback(() => setCollect(true), []);

  const onCollectDone = useCallback(
    (balance) => {
      setTimeout(() => {
        Animations.clearAnimations(weedRef.current, hatRef.current);
        setCollect(false);
        cleanUpState(balance);
      }, 1000);
    },
    [cleanUpState],
  );

  const onLostDone = useCallback(() => {
    Animations.clearAnimations(weedRef.current, hatRef.current);
    cleanUpState();
  }, [cleanUpState]);

  const playOutcome = useCallback(() => {
    if (!result.outcome) return;

    if (result.outcome === "won") {
      Animations.flyAway(hatRef.current, outcome.choice, collectWin);
    } else {
      Animations.showBulletHoles(onLostDone);
    }
  }, [result.outcome, outcome.choice, collectWin, onLostDone]);

  const checkBalance = useCallback(() => {
    console.log("STANJE JE", outcome);
    if (outcome.balance === 0) {
      Animations.animateMessageIn();
    }
  }, [outcome.balance]);

  const prepareOutcome = useCallback((choice) => {
    setOutcome((prev) => ({
      ...prev,
      choice: choice,
      balance: prev.balance - Config.ROUND_FEE,
    }));
  }, []);

  const refillBalance = useCallback(() => {
    setOutcome((prev) => ({ ...prev, balance: Config.START_BALANCE }));
    Animations.animateMessageOut();
  }, []);

  useEffect(() => {
    if (outcome.choice) {
      prepSoundRef.current?.play();
      Animations.rotateAndMove(weedRef.current, shoot);
    } else if (outcome.balance === 0) {
      checkBalance();
    }
  }, [outcome.choice, outcome.balance, shoot, checkBalance]);

  useEffect(() => {
    playOutcome();
  }, [playOutcome]);

  return (
    <div className="game">
      <MessageWithAction
        label="ADD CREDITS"
        message="You lost all your credits. Click the button below to refill your balance."
        action={refillBalance}
      />

      <Message status={result.outcome} />

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

      <div className="bullets" />

      <div className="hat" ref={hatRef} />

      <div className={`cowboy ${result.outcome ? result.outcome : "idle"}`} />

      {!outcome.choice && (
        <div className="guns">
          <div
            className="gun left-gun"
            onClick={() => prepareOutcome("left")}
          />
          <div
            className="gun right-gun"
            onClick={() => prepareOutcome("right")}
          />
        </div>
      )}

      <div className="tumbleweed" ref={weedRef} />
    </div>
  );
};
