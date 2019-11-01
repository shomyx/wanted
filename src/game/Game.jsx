import React from 'react';
import './Game.scss';

export const Game = () => {
	return (
		<div className="game">
			<div className="bullets"></div>
			<div className="hat"></div>
			<div className="cowboy"></div>
			<div className="guns">
				<div className="gun left-gun"></div>
				<div className="gun right-gun"></div>
			</div>
			<div className="tumbleweed"></div>
		</div>
	);
};