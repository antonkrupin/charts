import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChart, updateChart, deleteChart } from '../slices/chartReducer';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import Chart from '../components/chart';

const Settings = () => {
	const charts = useSelector((state) => state.chart.charts);

	const dispatch = useDispatch();

	const [show, setShow] = useState(false);

	const [title, setChartName] = useState('');

	const [type, setChartType] = useState('');

	const handleInput = (e) => {
		setChartName(e.target.value);
	} 

	const handleSetType = (e) => {
		setChartType(e.target.value);
	}

  const handleClose = () => {
		dispatch(addChart({title, type}));
		setShow(false)
	};
  const handleShow = () => setShow(true);

	return (
		<>
			<h4>Settings</h4>
			<Button variant="primary" onClick={handleShow} >Add chart</Button>
			<div className="row">
				{ charts.map((chart) => <Chart key={chart.id} options={chart.options}/>) }
			</div>
			<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creating Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<Form>
						<InputGroup className="mb-3" onChange={handleInput}>
							<Form.Control
								placeholder="Enter Chart Name"
								aria-label="chartName"
							/>
						</InputGroup>
						<Form.Select aria-label="Select Chart Type" onChange={handleSetType}>
							<option>Select Chart Type</option>
							<option>line</option>
							<option>spline</option>
							<option>area</option>
						</Form.Select>
					</Form>
				</Modal.Body>
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

/*

const options = {
		chart: {
			type: 'spline'
		},
		title: {
			text: 'My chart'
		},
		series: [
			{	
				name: 'First',
				data: [1, 2, 1, 4, 3, 6],
			},
			{
				name: 'Second',
				data: [2, 4, 5, 1, 8, 9],
			},
			{
				name: 'Third',
				data: [0, 10, 2, 1, 10, 12],
			}
		]
	};

*/