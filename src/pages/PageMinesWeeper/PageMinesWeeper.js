import React, { useState } from 'react';
import MinesWeeperBoard from '../../components/MinesWeeperBoard/MinesWeeperBoard';
import TopBar from '../../components/TopBar/TopBar';

const PageMinesWeeper = () => {
	const [rows, setRows] = useState(10);
	const [columns, setColumns] = useState(10);
	const [percentageOfBombs, setPercentageOfBombs] = useState(null);
	const [triggerResetGame, setTriggerResetGame] = useState(false);
	const [triggerTimer, setTriggerTimer] = useState({
		start: false,
		stop: false,
		reset: false,
	});

	return (
		<div>
			<TopBar
				setRows={setRows}
				setColumns={setColumns}
				setPercentageOfBombs={setPercentageOfBombs}
				setTriggerResetGame={setTriggerResetGame}
				percentageOfBombs={percentageOfBombs}
				triggerTimer={triggerTimer}
			/>
			<MinesWeeperBoard
				rows={rows}
				columns={columns}
				percentageOfBombs={percentageOfBombs}
				triggerResetGame={triggerResetGame}
				setTriggerTimer={setTriggerTimer}
			/>
		</div>
	);
};

export default PageMinesWeeper;
