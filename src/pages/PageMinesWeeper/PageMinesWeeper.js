import React, { useState } from 'react';
import MinesWeeperBoard from '../../components/MinesWeeperBoard/MinesWeeperBoard';
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
			<MinesWeeperBoard
				size={size}
				difficulty={difficulty}
				triggerResetGame={triggerResetGame}
				setTriggerTimer={setTriggerTimer}
			/>
		</div>
	);
};

export default PageMinesWeeper;
