import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { Nav } from 'react-bootstrap';

import ViewMode from './routes/viewMode.jsx';
import Settings from './routes/settings.jsx';
import Page404 from './routes/page404.jsx';
import NavigationBar from './components/navigationBar.jsx';
//import ClearLocalStorageBtn from './components/buttons/clearLocalStorageBtn.jsx';

import './App.css';

const App = () => (
	<BrowserRouter>
		{/*<Nav className="mt-2 mb-2 mr-auto justify-content-center" expand="lg">
			<Nav.Item>
				<Nav.Link as={Link} to="/viewmode">View Mode</Nav.Link>
			</Nav.Item>
			<Nav.Link as={Link} to="/settings">Settings</Nav.Link>
			<ClearLocalStorageBtn />
</Nav> */}
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
