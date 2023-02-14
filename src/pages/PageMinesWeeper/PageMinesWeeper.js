import React, { useState } from 'react';
import MineSweeperBoard from '../../components/MineSweeperBoard/MineSweeperBoard';
import TopBar from '../../components/TopBar/TopBar';

const PageMinesWeeper = () => {
	const [size, setSize] = useState(10);
	const [difficulty, setDifficulty] = useState(1);
	const [triggerResetGame, setTriggerResetGame] = useState(false);
	const [triggerTimer, setTriggerTimer] = useState({
		start: false,
		stop: false,
		reset: false,
	});

	return (
		<div>
			<TopBar
				setSize={setSize}
				setDifficulty={setDifficulty}
				setTriggerResetGame={setTriggerResetGame}
				difficulty={difficulty}
				triggerTimer={triggerTimer}
			/>
			<MineSweeperBoard
				size={size}
				difficulty={difficulty}
				triggerResetGame={triggerResetGame}
				setTriggerTimer={setTriggerTimer}
			/>
		</div>
	);
};

export default PageMinesWeeper;
