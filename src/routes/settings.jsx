import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import { addChart, updateChart, deleteChart } from '../slices/chartReducer';
import Chart from '../components/chart';
import AlertMessage from '../components/alert';
import ColorPicker from '../components/colorPicker';
import AddChartModal from '../components/addChartModal';

const Settings = () => {
	const charts = useSelector((state) => state.chart.charts);

	const location = useLocation().pathname;

	const dispatch = useDispatch();

	const [show, setShow] = useState(false);

	const [title, setChartName] = useState('');

	const [type, setChartType] = useState('');

	const [lines, setLinesCount] = useState([]);

	const [chartData, setChartData] = useState([]);

	const [linesName, setLinesName] = useState([]);

	const [creationDate, setCreationDate] = useState(new Date());
  
	const getRandomChartData = async () => {
		const response = await axios.get('https://www.random.org/sequences/?min=1&max=8&col=1&format=plain&rnd=new');
		return response.data.split('\n').filter((el) => el !== '').map((el) => Number(el));
	}

	const handleLinesName = (e) => {
		const copy =  Object.assign([], linesName);
		copy.push(e.target.value);
		setLinesName(copy);
	}

	const handleLinesCount = (e) => {
		const linesCount = Number(e.target.value);
		const linesValues = [];
		const result = [];
		for (let i = 0; i < linesCount; i += 1) {
			linesValues.push('1');
			result.push(getRandomChartData());
		}
		Promise.all(result).then((data) => {
			setChartData(data);
		});
		setLinesCount(linesValues);
	}

	const handleInput = (e) => {
		setChartName(e.target.value);
	} 

	const handleSetType = (e) => {
		setChartType(e.target.value);
	}

  const handleClose = () => {
		setShow(false);
	};

	const handleCreateChart = () => {
		setLinesCount([]);
		const date = creationDate.toLocaleDateString()
		dispatch(addChart({title, type, chartData, linesName, date}));
		setShow(false);
	}
  const handleShow = () => setShow(true);

	return (
		<>
			<AlertMessage />
			<div className="d-flex justify-content-center m-5">
				<Button variant="primary" onClick={handleShow} >Add chart</Button>
			</div>
			<div className="row">
				{ charts.map((chart) => <Chart key={chart.id} options={chart.options} id={chart.id} location={location}/>) }
			</div>
			<AddChartModal showModal={show} />
			{/*<Modal show={show} onHide={handleClose}>
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
						<DatePicker className="mb-3" onChange={setCreationDate} value={creationDate} />
						<Form.Select className="mb-3" aria-label="Select Chart Type" onChange={handleSetType}>
							<option>Select Chart Type</option>
							<option>line</option>
							<option>spline</option>
							<option>area</option>
							<option>bar</option>
							<option>pie</option>
						</Form.Select>
						<InputGroup className="mb-3" onChange={handleLinesCount}>
							<Form.Control
								placeholder="Enter Lines Count (max 10)"
								aria-label="linesCount"
							/>
						</InputGroup>
						{
							lines.map((line, index) => 
							<InputGroup key={index} className="mb-3">
								<Form.Control onBlur={handleLinesName} placeholder='Enter line name' />
							</InputGroup>)
						}
					</Form>
				</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button id="addBtn" variant="primary" onClick={handleCreateChart} >
            Add Chart
          </Button>
        </Modal.Footer>
					</Modal> */}
		</>
	)
};

export default Settings;
