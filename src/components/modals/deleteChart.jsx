import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { deleteChart } from '../../slices/chartReducer';
import { deleteChartModalShow } from '../../slices/modalsReducer';

const DeleteModal = (props) => {
	const dispatch = useDispatch();
  
	const isDeleteChartModalShow = useSelector((state) => state.modals.isDeleteChartModalShow);
	
	const handleDelete = () => {
		console.log(props.id)
		dispatch(deleteChart(props.id));
		dispatch(deleteChartModalShow(props.id));
	}

	return (
    <Modal show={isDeleteChartModalShow} onHide={() => dispatch(deleteChartModalShow())}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Chart?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="info" onClick={() => dispatch(deleteChartModalShow())}>
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