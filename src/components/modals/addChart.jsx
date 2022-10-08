import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import { addChart, addDate } from '../../slices/chartReducer';
import { addChartModalShow } from '../../slices/modalsReducer';

const AddChartModal = () => {
	const dispatch = useDispatch();
  
	const isAddChartModalShow = useSelector((state) => state.modals.isAddChartModalShow);

	const [title, setChartName] = useState('');

	const [type, setChartType] = useState('');

	const [parameters, setParametersCount] = useState([]);

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
		const parametersCount = Number(e.target.value);
		const parametersValues = [];
		const result = [];
		for (let i = 0; i < parametersCount; i += 1) {
			parametersValues.push('1');
			result.push(getRandomData());
		}
		Promise.all(result).then((data) => {
			const addBtn = document.querySelector('#addBtn');
			addBtn.classList.remove('disabled');
			setChartData(data);
		});
		setParametersCount(parametersValues);
	}

	const createChart = () => {
		setParametersCount([]);
		const date = creationDate.toLocaleDateString('ru')
		setCreationDate(new Date());
		dispatch(addChart({title, type, chartData, linesName, date}));
		dispatch(addDate({date}));
		setLinesName([]);
		dispatch(addChartModalShow());
	}

  return (
    <Modal show={isAddChartModalShow} onHide={() => dispatch(addChartModalShow())}>
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
						<Form.Label className="text-primary">Enter the number of chart parameters</Form.Label>
						<InputGroup className="mb-3" onChange={handleLinesCount}>
							<Form.Control
								placeholder="Enter Parameters Count"
								aria-label="parametersCount"
							/>
						</InputGroup>
					</Form.Group>
          <Form.Group>
					{
            parameters.map((line, index) => 
            <InputGroup key={index} className="mb-3">
              <Form.Control onBlur={handleLinesName} placeholder='Enter Parameter name' />
            </InputGroup>)
          }
					</Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(addChartModalShow())}>
          Close
        </Button>
        <Button id="addBtn" className="disabled" variant="primary" onClick={createChart}>
          Add Chart
        </Button>
      </Modal.Footer>
  </Modal>
  )
};

export default AddChartModal;