import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageMineSweeper from '../pages/PageMineSweeper/PageMineSweeper';
import { PATHS } from '../constants/paths';
import PublicLayout from '../layouts/PublicLayout/PublicLayout';
import PageRegister from '../pages/PageRegister/PageRegister';

const RouterApp = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={PATHS.BASE_URL} element={<PublicLayout />}>
					<Route index element={<PageMineSweeper />} />
					<Route path={PATHS.REGISTER} element={<PageRegister />} />
				</Route>

				<Route path='*' element={<Navigate to={PATHS.BASE_URL} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default RouterApp;
