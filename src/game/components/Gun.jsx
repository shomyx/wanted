import React, { useState, useEffect, memo } from 'react';
import * as Animations from '../Animations';

export const Gun = memo((props) => {

  return (
    <div className="option">
      <div className="front"></div>;
      <div className="pistol"></div>;
      <div className="back"></div>;
    </div>
  );
});