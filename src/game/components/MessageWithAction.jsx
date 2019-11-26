import React from 'react';

export const MessageWithAction = ({ message, action, label }) => (
  <div className="message-action">
    <div className="action-wrap" >
      <span>{message}</span>
      <span
        className="action"
        onClick={() => action()}
      >
        {label}
      </span>
    </div>
  </div>
);
