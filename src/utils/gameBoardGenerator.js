import { randomMinMax } from './random';

export const gameBoardGenerator = ({
	rows = 5,
	columns = 5,
	percentageOfBombs = 5,
}) => {
	let gameBoard = [];
	let howManyBombs = Math.ceil((rows * columns * percentageOfBombs) / 100);
	if (howManyBombs < 1) howManyBombs = 1;

	// Generate the array matrix
	for (let i = 0; i < rows; i++) {
		let newRow = [];

		for (let j = 0; j < columns; j++) {
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
		const rowIndex = randomMinMax(0, rows - 1);
		const columnIndex = randomMinMax(0, columns - 1);

		if (!gameBoard[rowIndex][columnIndex].isBomb) {
			gameBoard[rowIndex][columnIndex].isBomb = true;
			howManyBombs--;
		}
	}

	// evaluate bombs around in every cell
	for (let row = 0; row < rows; row++) {
		for (let column = 0; column < columns; column++) {
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
