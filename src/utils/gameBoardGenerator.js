import { randomMinMax } from './random';

export const gameBoardGenerator = ({ size = 5, percentageOfBombs = 5 }) => {
	let gameBoard = [];
	let howManyBombs = Math.ceil((size * size * percentageOfBombs) / 100);
	if (howManyBombs < 1) howManyBombs = 1;

	// Generate the array matrix
	for (let i = 0; i < size; i++) {
		let newRow = [];

		for (let j = 0; j < size; j++) {
			newRow.push({
				isBomb: false,
				isRevealed: false,
				bombsAround: 0,
				showIcon: '',
			});
		}
		gameBoard.push(newRow);
	}

	// Randomly place bombs
	while (howManyBombs > 0) {
		const rowIndex = randomMinMax(0, size - 1);
		const columnIndex = randomMinMax(0, size - 1);

		if (!gameBoard[rowIndex][columnIndex].isBomb) {
			gameBoard[rowIndex][columnIndex].isBomb = true;
			howManyBombs--;
		}
	}

	// evaluate bombs around in every cell
	for (let row = 0; row < size; row++) {
		for (let column = 0; column < size; column++) {
			let bombsAround = 0;

			for (let i = -1; i <= 1; i++) {
				for (let j = -1; j <= 1; j++) {
					if (gameBoard[row + i]?.[column + j]?.isBomb) {
						bombsAround++;
					}
				}
			}

			gameBoard[row][column].bombsAround = bombsAround;
		}
	}

	return gameBoard;
};

const dificultieToPercentage = {
	1: 4,
	2: 6,
	3: 10,
	4: 14,
	5: 20,
	6: 24,
	7: 30,
};
export const newGameBoardGenerator = ({ size, difficulty }) => {
	if (size < 2) size = 2;

	return gameBoardGenerator({
		size,
		percentageOfBombs: dificultieToPercentage[difficulty],
	});
};
