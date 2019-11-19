import React from 'react';

export const Message = ({ status }) => (
  <div className="message-wrap">
    <div className="message" >
      <span>You</span>
      <span>{`${status}!`}</span>
    </div>
  </div>
);
