import React from 'react';
import { Button } from 'react-bootstrap';

const ClearLocalStorageBtn = (props) => {
	const clearLocalStorage = () => {
		window.location.reload();
		localStorage.clear()
	}
	let button;
	if (props.location === '/settings') {
		button = (
			<Button variant="danger" onClick={clearLocalStorage}>Clear LocalStorage</Button>
		)
	}
	return (
		<>
			{ button }
		</>
	)
};

export default ClearLocalStorageBtn;