import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import ViewMode from './routes/viewMode';
import Settings from './routes/settings';
import Page404 from './routes/page404';
import logo from './logo.svg';
import './App.css';

const App = () => (
	<BrowserRouter>
		<Nav className="mr-auto justify-content-center" expand="lg">
			<Nav.Item>
				<Nav.Link as={Link} to="/viewmode">View Mode</Nav.Link>
			</Nav.Item>
			<Nav.Link as={Link} to="/settings">Settings</Nav.Link>
		</Nav>
		<Routes>
			<Route path="/" element={<ViewMode/>} />
			<Route path="viewmode" element={<ViewMode />} />
			<Route path="settings" element={<Settings />} />
			<Route path="*" element={ <Page404 /> } />
		</Routes>
	</BrowserRouter>
);

export default App;
