import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import React from 'react';
import LandingPage from './pages/LandingPage/index.jsx';
import LoginPage from './pages/LoginPage/index.jsx';
import RegisterPage from './pages/RegisterPage/index.jsx';
import NavBar from './layout/NavBar/index.jsx';
import Footer from './layout/Footer/index.jsx';

const Layout = () => {
	return (
		<div>
			<NavBar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

function App() {
	
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<LandingPage />} />
				<Route path={'/login'} element={<LoginPage />} />
				<Route path={'/register'} element={<RegisterPage />} />
			</Route>
		</Routes>
	);
}

export default App;
