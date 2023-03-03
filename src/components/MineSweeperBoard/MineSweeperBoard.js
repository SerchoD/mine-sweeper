import React, { useEffect, useState, useCallback } from 'react';
import { newGameBoardGenerator } from '../../utils/gameBoardGenerator';
import { randomHexadecimal as rndKey } from '../../utils/random';
import { BOMBSAROUND_COLORS } from '../../constants/colors';
import './MineSweeperBoard.scss';

const MineSweeperBoard = ({
	size,
	difficulty,
	triggerResetGame,
	setTriggerTimer,
}) => {
	const [gameBoard, setGameBoard] = useState(
		newGameBoardGenerator({
			size,
			difficulty,
		})
	);
	const [isFirstClick, setIsFirstClick] = useState(true);
	const [gameOver, setGameOver] = useState(false);
	const [gameWon, setGameWon] = useState(false);
	const [gameIsRunning, setGameIsRunning] = useState(!gameWon && !gameOver);

	const handleResetGame = useCallback(() => {
		setGameBoard(
			newGameBoardGenerator({
				size,
				difficulty,
			})
		);
		setGameOver(false);
		setGameWon(false);
		setIsFirstClick(true);
		setTriggerTimer((prevState) => ({ ...prevState, reset: !prevState.reset }));
	}, [difficulty, setTriggerTimer, size]);

	useEffect(() => {
		handleResetGame();
	}, [triggerResetGame, handleResetGame]);

	const handleCellClick = ({ cell }) => {
		const { rowIndex: row, columnIndex: column } = cell;

		if (isFirstClick) {
			setTriggerTimer((prevState) => ({ ...prevState, start: !prevState.start }));

			setIsFirstClick(false);
			if (cell.isBomb) {
				gameBoard[row][column].isBomb = false;

				let bombsAround = 0;
				for (let i = -1; i <= 1; i++) {
					for (let j = -1; j <= 1; j++) {
						if (gameBoard[row + i]?.[column + j]?.isBomb) {
							bombsAround++;
						}
					}
				}
				gameBoard[row][column].bombsAround = bombsAround;

				// evaluate the bombsAround of the cells adjacent to the clicked cell
				for (let i = -1; i <= 1; i++) {
					for (let j = -1; j <= 1; j++) {
						if (gameBoard[row + i]?.[column + j]?.isBomb === false) {
							let bombsAround = 0;
							for (let k = -1; k <= 1; k++) {
								for (let l = -1; l <= 1; l++) {
									if (gameBoard[row + i + k]?.[column + j + l]?.isBomb) {
										bombsAround++;
									}
								}
							}
							gameBoard[row + i][column + j].bombsAround = bombsAround;
						}
					}
				}

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

	const handleWinGame = useCallback(() => {
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
	}, [gameBoard, setTriggerTimer]);

	useEffect(() => {
		handleWinGame();
	}, [gameBoard, handleWinGame]);

	useEffect(() => {
		setGameIsRunning(!gameOver && !gameWon);
	}, [gameOver, gameWon]);

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
					<div key={rndKey()} className='row'>
						{row.map((cell, columnIndex) => {
							return (
								<div
									key={rndKey()}
									className={`${cell?.isRevealed ? 'cell cell-revealed' : 'cell'}`}
									style={{
										color: BOMBSAROUND_COLORS[cell?.bombsAround],
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

									{cell?.isRevealed && cell?.bombsAround && !cell?.isBomb > 0
										? cell?.bombsAround
										: ''}
									{gameIsRunning && cell?.showIcon}

									{!gameIsRunning && cell?.showIcon === '🚩' && cell?.isBomb ? (
										<span style={{ filter: 'hue-rotate(160deg)' }}>🚩</span>
									) : (
										!gameIsRunning && cell?.showIcon === '🚩' && <span>🚩</span>
									)}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default MineSweeperBoard;
