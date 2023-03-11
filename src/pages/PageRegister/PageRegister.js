import React, { useState } from 'react';

const PageRegister = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleConfirmPasswordChange = (event) => {
		setConfirmPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// TODO: Handle user registration
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<div className=''>
					<label htmlFor='username'>Username:</label>
					<input
						type='text'
						id='username'
						value={username}
						onChange={handleUsernameChange}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<div>
					<label htmlFor='confirmPassword'>Confirm Password:</label>
					<input
						type='password'
						id='confirmPassword'
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
					/>
				</div>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
};

export default PageRegister;
