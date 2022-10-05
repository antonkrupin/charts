import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';

import { addChart, updateChart, deleteChart } from '../slices/chartReducer';
import Chart from '../components/chart';
import AlertMessage from '../components/alert';
import ColorPicker from '../components/colorPicker';
import DateSelector from '../components/datePicker';

const Settings = () => {
	const charts = useSelector((state) => state.chart.charts);

	const location = useLocation().pathname;
	// const ref = useRef(null);

	const dispatch = useDispatch();

	const [show, setShow] = useState(false);

	const [title, setChartName] = useState('');

	const [type, setChartType] = useState('');

	const [lines, setLinesCount] = useState([]);

	const [chartData, setChartData] = useState([]);

	const [linesName, setLinesName] = useState([]);

	const [date, setDate] = useState('');

	const handleDate = (e) => {
		setDate(e.target.value);
	}
  
	const getNumbers = async () => {
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
			result.push(getNumbers());
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
		// const date = new Date().toLocaleDateString();
		// console.log(date);
		getNumbers();
		setLinesCount([]);
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
						<InputGroup className="mb-3" onChange={handleDate}>
							<Form.Control
								placeholder="Enter Chart Creation Date"
								aria-label="chartDate"
							/>
						</InputGroup>
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

	import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
const YourComponent = () => {
  const [color, setColor] = useState("#aabbcc");
  return <HexColorPicker color={color} onChange={setColor} />;
};

*/