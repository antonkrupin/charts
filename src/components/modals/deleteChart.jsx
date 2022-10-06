import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { changeDeleteModalShow, deleteChart } from '../../slices/chartReducer';

const DeleteModal = (props) => {
	const dispatch = useDispatch();
  
	const isDeleteModalShow = useSelector((state) => state.chart.isDeleteModalShow);
	
	const handleDelete = () => {
		console.log(props.id)
		dispatch(deleteChart(props.id));
		dispatch(changeDeleteModalShow());
	}

	return (
    <Modal show={isDeleteModalShow} onHide={() => dispatch(changeDeleteModalShow())}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Chart?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="info" onClick={() => dispatch(changeDeleteModalShow())}>
          No
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
  </Modal>
  )
};

export default DeleteModal;