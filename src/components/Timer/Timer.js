import React, { useState, useEffect } from 'react';
import './Timer.scss';

const Timer = ({ triggerTimer }) => {
	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [minutes, setMinutes] = useState(0);

	useEffect(() => {
		let animationFrame = null;
		if (isRunning) {
			setStartTime(performance.now());
			const update = () => {
				const elapsedTime = performance.now() - startTime;
				setCurrentTime(elapsedTime);
				const elapsedSeconds = Math.floor(elapsedTime / 1000);
				setMinutes(Math.floor(elapsedSeconds / 60));
				animationFrame = requestAnimationFrame(update);
			};
			update();
		} else {
			cancelAnimationFrame(animationFrame);
		}
		return () => cancelAnimationFrame(animationFrame);
	}, [isRunning, startTime]);

	const startTimer = () => {
		setIsRunning(true);
	};

	const stopTimer = () => {
		setIsRunning(false);
	};

	const resetTimer = () => {
		setIsRunning(false);
		setStartTime(0);
		setCurrentTime(0);
		setMinutes(0);
	};

	useEffect(() => {
		startTimer();
	}, [triggerTimer.start]);

	useEffect(() => {
		stopTimer();
	}, [triggerTimer.stop]);

	useEffect(() => {
		resetTimer();
	}, [triggerTimer.reset]);

	const seconds = Math.floor(currentTime / 1000) % 60;
	const hundredthsOfSeconds = Math.floor((currentTime / 10) % 100);

	return (
		<div className='timer-container'>
			{minutes <= 0 ? '' : minutes + ':'}
			{seconds < 10 ? `0${seconds}` : seconds}:
			{hundredthsOfSeconds < 10 ? `0${hundredthsOfSeconds}` : hundredthsOfSeconds}
		</div>
	);
};

export default Timer;
