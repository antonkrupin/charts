import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChart, updateChart, deleteChart } from '../slices/chartReducer';
import { Button, Modal } from 'react-bootstrap';
import Chart from '../components/chart';

const Settings = () => {
	const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	return (
		<>
			<h4>Settings</h4>
			<Button variant="primary" onClick={handleShow} >Add chart</Button>
			<div className="row">
				<Chart />
				<Chart />
				<Chart />
			</div>
			<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Chart
          </Button>
        </Modal.Footer>
      </Modal>
		</>
	)
};

export default Settings;