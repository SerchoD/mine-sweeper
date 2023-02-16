import React, { useState } from 'react';
import { DIFFICULTY_COLORS } from '../../constants/colors';
import Spinner from '../Spinner/Spinner';
import Timer from '../Timer/Timer';
import './TopBar.scss';

const TopBar = ({
	setSize,
	setDifficulty,
	difficulty,
	setTriggerResetGame,
	triggerTimer,
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const generateValues = (min = 3, max = 100) => {
		let values = [];
		for (let i = min; i <= max; i++) {
			values.push(i);
		}
		return values;
	};

	const handleRestartButton = () => {
		setIsLoading(true);
		setTimeout(() => {
			setTriggerResetGame((oldValue) => !oldValue);
			setIsLoading(false);
		}, 300);
	};

	return (
		<div className='topbar-container'>
			<Timer triggerTimer={triggerTimer} />
			<div className='topbar-select'>
				<label htmlFor='rows'>Size</label>
				<select
					id='rows'
					className='select-input'
					onChange={(e) => {
						setSize(parseInt(e.target.value));
					}}
					defaultValue={10}
				>
					{generateValues().map((value) => (
						<option key={value} value={value}>
							{value}
						</option>
					))}
				</select>
			</div>

			<div className='topbar-select'>
				<label htmlFor='percentageOfBombs'>Difficulty</label>
				<select
					id='percentageOfBombs'
					className='select-input'
					onChange={(e) => {
						setDifficulty(parseInt(e.target.value));
					}}
					style={{ backgroundColor: DIFFICULTY_COLORS[difficulty] }}
					defaultValue={difficulty}
				>
					{generateValues(1, 7).map((value) => (
						<option
							key={value}
							value={value}
							className='select-input-options'
							style={{ backgroundColor: DIFFICULTY_COLORS[value] }}
						>
							{value}
						</option>
					))}
				</select>
			</div>

			<div className='button reset-button-container'>
				<button className='button-container' onClick={handleRestartButton}>
					{isLoading ? <Spinner /> : 'Reset'}
				</button>
			</div>
		</div>
	);
};

export default TopBar;
