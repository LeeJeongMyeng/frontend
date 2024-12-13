import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import React from 'react';
import LandingPage from './pages/LandingPage/index.jsx';
import LoginPage from './pages/LoginPage/index.jsx';
import RegisterPage from './pages/RegisterPage/index.jsx';
import NavBar from './layout/NavBar/index.jsx';
import Footer from './layout/Footer/index.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = () => {
	return (
		<div className={'flex flex-col h-screen justify-between'}>
			<ToastContainer
				position={'bottom-right'}
				theme={'light'}
				pauseOnHover
				autoClose={1500} //1500ms
			/>
			<NavBar />
			<main className={'mb-auto w-10/12 max-w-4xl mx-auto'}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

function App() {
	
	return (
		<Routes>
			<Route path="/"
			       element={<Layout />}>
				<Route index
				       element={<LandingPage />} />
				<Route path={'/login'}
				       element={<LoginPage />} />
				<Route path={'/register'}
				       element={<RegisterPage />} />
			</Route>
		</Routes>
	);
}

export default App;
