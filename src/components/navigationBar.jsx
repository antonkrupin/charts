import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import ClearLocalStorageBtn from './buttons/clearLocalStorageBtn';

const NavigationBar = () => {
	const location = useLocation().pathname;
	
	return (
		<Nav className="mt-2 mb-2 mr-auto justify-content-center" expand="lg">
			<Nav.Item>
				<Nav.Link as={Link} to="/viewmode">View Mode</Nav.Link>
			</Nav.Item>
			<Nav.Link as={Link} to="/settings">Settings</Nav.Link>
			<ClearLocalStorageBtn location={location} />
		</Nav>
	)
};

export default NavigationBar;