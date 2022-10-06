import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import { addChart, changeModalShow, updateChart, deleteChart } from '../../slices/chartReducer';

const AddChartModal = () => {
	const dispatch = useDispatch();
  
	const isModalShow = useSelector((state) => state.chart.isModalShow);

	const [title, setChartName] = useState('');

	const [type, setChartType] = useState('');

	const [lines, setLinesCount] = useState([]);

	const [chartData, setChartData] = useState([]);

	const [linesName, setLinesName] = useState([]);

	const [creationDate, setCreationDate] = useState(new Date());
  
	const getRandomData = async () => {
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
			result.push(getRandomData());
		}
		Promise.all(result).then((data) => {
			const addBtn = document.querySelector('#addBtn');
			addBtn.classList.remove('disabled');
			setChartData(data);
		});
		setLinesCount(linesValues);
	}

	const handleCreateChart = () => {
		setLinesCount([]);
		const date = creationDate.toLocaleDateString()
		setCreationDate(new Date());
		dispatch(addChart({title, type, chartData, linesName, date}));
		dispatch(changeModalShow());
	}

  return (
    <Modal show={isModalShow} onHide={() => dispatch(changeModalShow())}>
      <Modal.Header closeButton>
        <Modal.Title>Create Chart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
					<Form.Group>
						<Form.Label className="text-primary">Chart name</Form.Label>
						<InputGroup onChange={(e) => setChartName(e.target.value)} >
							<Form.Control
								placeholder="Enter Chart Name"
								aria-label="chartName"
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label className="text-primary">Chart creation date</Form.Label>
						<DatePicker className="m-3" onChange={setCreationDate} value={creationDate} />
					</Form.Group>
          <Form.Group>
						<Form.Label className="text-primary">Select Chart type</Form.Label>
						<Form.Select className="mb-3" aria-label="Select Chart Type" onChange={(e) => setChartType(e.target.value)}>
							<option>Select chart type</option>
							<option>line</option>
							<option>spline</option>
							<option>area</option>
							<option>bar</option>
							<option>pie</option>
						</Form.Select>
					</Form.Group>
          <Form.Group>
						<Form.Label className="text-primary">Enter Charts count</Form.Label>
						<InputGroup className="mb-3" onChange={handleLinesCount}>
							<Form.Control
								placeholder="Enter Charts Count"
								aria-label="chartsCount"
							/>
						</InputGroup>
					</Form.Group>
          <Form.Group>
					{
            lines.map((line, index) => 
            <InputGroup key={index} className="mb-3">
              <Form.Control onBlur={handleLinesName} placeholder='Enter Chart name' />
            </InputGroup>)
          }
					</Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(changeModalShow())}>
          Close
        </Button>
        <Button id="addBtn" className="disabled" variant="primary" onClick={handleCreateChart}>
          Add Chart
        </Button>
      </Modal.Footer>
  </Modal>
  )
};

export default AddChartModal;