import React from 'react';
import { Button } from 'react-bootstrap';

const ClearLocalStorageBtn = () => {
	const clearLocalStorage = () => {
		window.location.reload();
		localStorage.clear()
	}
	return (
		<Button variant="danger" onClick={clearLocalStorage}>Clear LocalStorage</Button>
	)
};

export default ClearLocalStorageBtn;