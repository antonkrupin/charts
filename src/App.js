import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ViewMode from './routes/viewMode.jsx';
import Settings from './routes/settings.jsx';
import Page404 from './routes/page404.jsx';
import NavigationBar from './components/navigationBar.jsx';

import './App.css';

const App = () => (
	<BrowserRouter>
		<NavigationBar />
		<Routes>
			<Route path="/" element={<ViewMode/>} />
			<Route path="viewmode" element={<ViewMode />} />
			<Route path="settings" element={<Settings />} />
			<Route path="*" element={ <Page404 /> } />
		</Routes>
	</BrowserRouter>
);

export default App;
