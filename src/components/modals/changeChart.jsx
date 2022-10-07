import _ from 'lodash';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { updateChart } from '../../slices/chartReducer';
import { updateChartModalShow } from '../../slices/modalsReducer';
import ColorPicker from '../colorPicker';

const ChangeModal = (props) => {
	const dispatch = useDispatch();
	
	const isUpdateChartModalShow = useSelector((state) => state.modals.isUpdateChartModalShow);

	const updatingChart = useSelector((state) => state.chart.chartForChange);
	
	//const [chartTitle, setNewChartTitle] = useState(updatingChart.options.title.text);

	//const [chartType, setNewChartTipe] = useState(updatingChart.options.chart.type);
	let newChartTitle;
	let newChartType;
	if (updatingChart !== '') {
		newChartTitle = updatingChart.options.title.text;
		newChartType = updatingChart.options.chart.type
	} 

	const setNewChartTitle = (e) => {
		newChartTitle = e.target.value;
	}

	const setNewChartType = (e) => {
		newChartType = e.target.value;
	}

	const handleChangeChartName = () => {
		console.log(color);
		const { options } = _.cloneDeep(updatingChart);
		options.title.text = newChartTitle;
		options.chart.type = newChartType;
		options.series[0]['color'] = "#8B0000";
		const { id } = updatingChart;
		dispatch(updateChart({id, options}));
		dispatch(updateChartModalShow());
	}
	
	return (
    <Modal show={isUpdateChartModalShow} onHide={() => dispatch(updateChartModalShow())}>
      <Modal.Header closeButton>
        <Modal.Title>Change Chart</Modal.Title>
      </Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
							<Form.Label className="text-primary">Chart name - {newChartTitle}</Form.Label>
							<InputGroup onInput={setNewChartTitle} >
								<Form.Control 
									placeholder="Enter Chart Name"
									aria-label="chartName"
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group>
							<Form.Label className="text-primary">Chart Type - {newChartType}</Form.Label>
							<Form.Select className="mb-3" aria-label="Select Chart Type" onChange={setNewChartType}>
								<option>Select new chart type</option>
								<option>line</option>
								<option>spline</option>
								<option>area</option>
								<option>bar</option>
								<option>pie</option>
							</Form.Select>
					</Form.Group>
					<ColorPicker />
				</Form>
			</Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={() => dispatch(updateChartModalShow())}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleChangeChartName}>
          Save Changes
        </Button>
      </Modal.Footer>
  </Modal>
  )
};

export default ChangeModal;