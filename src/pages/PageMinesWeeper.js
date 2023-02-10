import React, { useEffect, useState } from 'react';
import MinesWeeperBoard from '../components/MinesWeeperBoard/MinesWeeperBoard';
import TopBar from '../components/TopBar/TopBar';

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
				triggerTimer={triggerTimer}
				setRows={setRows}
				setColumns={setColumns}
				setPercentageOfBombs={setPercentageOfBombs}
				percentageOfBombs={percentageOfBombs}
				setTriggerResetGame={setTriggerResetGame}
			/>
			<MinesWeeperBoard
				setTriggerTimer={setTriggerTimer}
				rows={rows}
				columns={columns}
				percentageOfBombs={percentageOfBombs}
				triggerResetGame={triggerResetGame}
			/>
		</div>
	);
};

export default PageMinesWeeper;
