import React, { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import Timer from '../Timer/Timer';
import './TopBar.scss';

const generateBackgroundColor = (num) => {
	const green = [0, 150, 80];
	const red = [150, 0, 80];

	let color = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		color[i] = green[i] + (red[i] - green[i]) * (num / 7);
	}

	return `rgba(${color[0]},${color[1]},${color[2]})`;
};

const TopBar = ({
	setRows,
	setColumns,
	setPercentageOfBombs,
	percentageOfBombs,
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
			{/* <Timer triggerTimer={triggerTimer} /> */}
			<div className='topbar-select'>
				<label htmlFor='rows'>Rows</label>
				<select
					id='rows'
					className='select-input'
					onChange={(e) => {
						setRows(parseInt(e.target.value));
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
				<label htmlFor='columns'>Columns</label>
				<select
					id='columns'
					className='select-input'
					onChange={(e) => {
						setColumns(parseInt(e.target.value));
					}}
					defaultValue={10}
				>
					{generateValues().map((value) => (
						<option key={value} value={value} className='select-input-options'>
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
						setPercentageOfBombs(parseInt(e.target.value));
					}}
					style={{ backgroundColor: generateBackgroundColor(percentageOfBombs) }}
					defaultValue={1}
				>
					{generateValues(1, 7).map((value) => (
						<option
							key={value}
							value={value}
							className='select-input-options'
							style={{ backgroundColor: generateBackgroundColor(value) }}
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
