import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import ViewMode from './routes/viewMode';
import Settings from './routes/settings';
import Page404 from './routes/page404';
import logo from './logo.svg';
import './App.css';

const App = () => (
	<BrowserRouter>
		<Navbar bg="light" expand="lg">
			<Nav className="mr-atuo">
				<Nav.Link as={Link} to="/viewmode">View Mode</Nav.Link>
				<Nav.Link as={Link} to="/settings">Settings</Nav.Link>
			</Nav>
		</Navbar>
		<Routes>
			<Route path="/" element={<ViewMode/>} />
			<Route path="viewmode" element={<ViewMode />} />
			<Route path="settings" element={<Settings />} />
			<Route path="*" element={ <Page404 /> } />
		</Routes>
	</BrowserRouter>
);

export default App;
