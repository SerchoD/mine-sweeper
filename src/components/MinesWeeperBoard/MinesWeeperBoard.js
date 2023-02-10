import React, { useEffect, useState } from 'react';
import './MinesWeeperBoard.scss';
import { gameBoardGenerator } from '../../utils/gameBoardGenerator';
import { randomHexadecimal as rnd } from '../../utils/random';

const newGameBoardGenerator = ({ rows, columns, percentageOfBombs }) => {
	if (rows < 2) rows = 2;
	if (columns < 2) columns = 2;

	if (percentageOfBombs < 1) percentageOfBombs = 1;
	if (percentageOfBombs > 50) percentageOfBombs = 50;

	return gameBoardGenerator({
		rows: rows,
		columns: columns,
		percentageOfBombs: percentageOfBombs,
	});
};

const dificulties = {
	1: 4,
	2: 6,
	3: 10,
	4: 14,
	5: 20,
	6: 24,
	7: 30,
};

const MinesWeeperBoard = ({
	rows,
	columns,
	percentageOfBombs,
	triggerResetGame,
	setTriggerTimer,
}) => {
	const [gameBoard, setGameBoard] = useState(
		newGameBoardGenerator({
			rows,
			columns,
			percentageOfBombs: dificulties[percentageOfBombs],
		})
	);
	const [isFirstClick, setIsFirstClick] = useState(true);

	const [gameOver, setGameOver] = useState(false);
	const [gameWon, setGameWon] = useState(false);

	const handleResetGame = () => {
		setGameBoard(
			newGameBoardGenerator({
				rows,
				columns,
				percentageOfBombs: dificulties[percentageOfBombs],
			})
		);
		setGameOver(false);
		setGameWon(false);
		setIsFirstClick(true);
		setTriggerTimer((prevState) => ({ ...prevState, reset: !prevState.reset }));
	};

	useEffect(() => {
		handleResetGame();
	}, [triggerResetGame]);

	const handleCellClick = ({ cell }) => {
		const { rowIndex: row, columnIndex: column } = cell;

		if (isFirstClick) {
			setTriggerTimer((prevState) => ({ ...prevState, start: !prevState.start }));

			setIsFirstClick(false);
			if (cell.isBomb) {
				gameBoard[row][column].isBomb = false;

				// evaluate bombs around in the new cell that now it's empty
				let bombsAround = 0;
				for (let i = -1; i <= 1; i++) {
					for (let j = -1; j <= 1; j++) {
						if (gameBoard[row + i]?.[column + j]?.isBomb) {
							bombsAround++;
						}
					}
				}
				gameBoard[row][column].bombsAround = bombsAround;

				setGameBoard([...gameBoard]);
			}
		}

		if (!cell.isRevealed && cell.showIcon === '') {
			gameBoard[row][column].isRevealed = true;

			if (gameBoard[row][column].isBomb === false) {
				revealAdjacentCells(row, column);
				setGameBoard([...gameBoard]);
			} else {
				setGameOver(true);
				setTriggerTimer((prevState) => ({ ...prevState, stop: !prevState.stop }));
			}
		}
	};

	const revealAdjacentCells = (row, column) => {
		const directions = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, 1],
			[1, 1],
			[1, 0],
			[1, -1],
			[0, -1],
		];

		for (let i = 0; i < directions.length; i++) {
			const r = row + directions[i][0];
			const c = column + directions[i][1];
			const cell = gameBoard[r]?.[c];

			if (cell?.isBomb === false && !cell.isRevealed && cell.showIcon === '') {
				cell.isRevealed = true;
				if (cell.bombsAround === 0) {
					revealAdjacentCells(r, c);
				}
			}
		}
	};

	const handleSecondaryClick = (e, params) => {
		e.preventDefault();
		const { cell } = params;
		const { rowIndex: row, columnIndex: column } = cell;

		if (!isFirstClick) {
			if (!gameBoard[row][column].isRevealed) {
				if (gameBoard[row][column].showIcon === '') {
					gameBoard[row][column].showIcon = '🚩';
				} else if (gameBoard[row][column].showIcon === '🚩') {
					gameBoard[row][column].showIcon = '❓';
				} else if (gameBoard[row][column].showIcon === '❓') {
					gameBoard[row][column].showIcon = '';
				}
			}
			setGameBoard([...gameBoard]);
		}
	};

	const handleWinGame = () => {
		const isGameWon = gameBoard.every((row) => {
			return row.every((cell) => {
				return (
					(cell.isRevealed && !cell.isBomb) ||
					(!cell.isRevealed && cell.isBomb && cell.showIcon === '🚩')
				);
			});
		});
		if (isGameWon) {
			setGameWon(true);
			setTriggerTimer((prevState) => ({ ...prevState, stop: !prevState.stop }));
		}
	};

	useEffect(() => {
		handleWinGame();
	}, [gameBoard]);

	return (
		<div
			className='main-container'
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			{gameOver && (
				<div className='game-over-container' onClick={handleResetGame}>
					<h1 className='game-over-text'>Game Over</h1>
				</div>
			)}
			{gameWon && (
				<div className='game-won-container' onClick={handleResetGame}>
					<h1 className='game-won-text'>You Won</h1>
				</div>
			)}
			{gameBoard?.map((row, rowIndex) => {
				return (
					<div key={rnd()} className='row'>
						{row.map((cell, columnIndex) => {
							return (
								<div
									key={rnd()}
									className={`${cell?.isRevealed ? 'cell cell-revealed' : 'cell'}`}
									style={{
										color: cell?.isRevealed
											? cell?.bombsAround === 1
												? '#2196F3'
												: cell?.bombsAround === 2
												? '#4CAF50'
												: cell?.bombsAround === 3
												? '#FFC107'
												: cell?.bombsAround === 4
												? '#F44336'
												: cell?.bombsAround === 5
												? '#9C27B0'
												: cell?.bombsAround === 6
												? '#3F51B5'
												: cell?.bombsAround === 7
												? '#009688'
												: cell?.bombsAround === 8
												? '#795548'
												: ''
											: '',
									}}
									onClick={() => {
										handleCellClick({
											cell: { ...cell, rowIndex, columnIndex },
										});
									}}
									onContextMenu={(e) => {
										handleSecondaryClick(e, { cell: { ...cell, rowIndex, columnIndex } });
									}}
								>
									{(cell.isBomb && cell.isRevealed) ||
									(gameOver && cell?.isBomb && cell?.showIcon === '')
										? '💣'
										: ''}
									{cell?.showIcon}
									{cell?.isRevealed && cell?.bombsAround && !cell?.isBomb > 0
										? cell?.bombsAround
										: ''}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default MinesWeeperBoard;
