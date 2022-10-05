import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import { addChart, updateChart, deleteChart } from '../slices/chartReducer';

const AddChartModal = (props) => {
  console.log(props.showModal);
	const dispatch = useDispatch();

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

	const handleCreateChart = () => {
		setLinesCount([]);
		const date = creationDate.toLocaleDateString()
		dispatch(addChart({title, type, chartData, linesName, date}));
		setShow(false);
	}

  const [show, setShow] = useState(props.showModal);

  const handleShow = () => setShow(true);

  const handleClose = () => {
		setShow(false);
	};

  return (
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
  </Modal>
  )
};

export default AddChartModal;