import React from 'react';
import * as Animations from '../Animations';

const messages = {
  won: 'You won',
  lost: 'You lost',
  balance: 'You have 0 credits',
};

export const Message = ({ status }) => {
  return (
    <div className="message-wrap">
      <div className="message" onClick={() => Animations.animateMessage()}>
        <span>You</span>
        <span>won!</span>
      </div>
    </div>
  )
};