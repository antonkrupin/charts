import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, InputGroup, Overlay } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-date-picker';

import SelectChartType from '../selectChartType.jsx';

import { addChart, addDate } from '../../slices/chartReducer.js';
import { addChartModalShow } from '../../slices/modalsReducer.js';

import '../../styles/datePicker.css';

const AddChartModal = () => {
	const target = useRef(null);
	
	const dispatch = useDispatch();
  
	const isAddChartModalShow = useSelector((state) => state.modals.isAddChartModalShow);

	const [title, setChartTitle] = useState('');

	const [type, setChartType] = useState('');

	const [chartData, setChartData] = useState([]);

	const [parametersNames, setParametersNames] = useState([]);

	const [creationDate, setCreationDate] = useState(new Date());

	const [showOverlayTooltip, setShowOverlayTooltip] = useState(false);
  
	const getRandomData = async () => {
		const response = await axios.get('https://www.random.org/sequences/?min=1&max=8&col=1&format=plain&rnd=new');
		return response.data.split('\n').filter((el) => el !== '').map((el) => Number(el));
	}

	const chartParametersNames = (e) => {
		setParametersNames([...parametersNames, e.target.value]);
	}

	const chartParametersCount = (e) => {
		const addBtn = document.querySelector('#addBtn');
		addBtn.classList.add('disabled');

		const result = [];
		const parametersCount = Number(e.target.value);
		setShowOverlayTooltip(!showOverlayTooltip);
		for (let i = 0; i < parametersCount; i += 1) {
			result.push(getRandomData());
		}

		Promise.all(result).then((data) => {
			addBtn.classList.remove('disabled');
			setShowOverlayTooltip(false);
			setChartData(data);
		});
	}

	const createChart = () => {
		const date = creationDate.toLocaleDateString('ru');

		setCreationDate(new Date());
		const series = parametersNames.map((name, index) => ({name, data:chartData[index]}));
		dispatch(addChart({title, type, series, date}));
		dispatch(addDate({date}));
		setChartData([]);
		setParametersNames([]);
		dispatch(addChartModalShow());
	}

	const closeModal = () => {
		setChartData([]);
		setParametersNames([]);
		dispatch(addChartModalShow())
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
						<InputGroup onChange={(e) => setChartTitle(e.target.value)} >
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
					<SelectChartType onChange={(e) => setChartType(e.target.value)} modal='addChart' />
					<Form.Group>
						<Form.Label className="text-primary">Enter the number of chart parameters</Form.Label>
						<InputGroup className="mb-3" onChange={chartParametersCount}>
							<Form.Control
								placeholder="Enter parameters Count"
								aria-label="parametersCount"
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						{
							chartData.map((parameter, index) => 
								<InputGroup key={index} className="mb-3">
									<Form.Control onBlur={chartParametersNames} placeholder='Enter Parameter name' />
								</InputGroup>)
						}
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>
          Close
				</Button>
				<Button id="addBtn" className="disabled" variant="primary" onClick={createChart} ref={target}>
          Add Chart
				</Button>
				<Overlay target={target.current} show={showOverlayTooltip} placement="top">
					{ /* eslint-disable-next-line no-unused-vars*/ }
					{({ placement, arrowProps, show: _show, popper, ...props }) => (
						<div
							{...props}
							style={{
								position: 'relative',
								width: '100px',
								backgroundColor: 'rgba(144, 238, 144, 0.85)',
								padding: '2px 10px',
								color: 'black',
								borderRadius: 3,
								zIndex: 1000000,
								...props.style,
							}}
						>
							Wait, while random chart data generated.
						</div>
					)}
				</Overlay>
			</Modal.Footer>
		</Modal>
	)
};

export default AddChartModal;