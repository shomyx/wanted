import React from 'react';
import { Game } from './game/Game';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="game-wrapper">
        <Game />
        <div className="frame"></div>
      </div>
    </div>
  );
}

export default App;
