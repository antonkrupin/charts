import _ from 'lodash';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

import { updateChart } from '../../slices/chartReducer';
import { updateChartModalShow } from '../../slices/modalsReducer';
import ColorPicker from '../colorPicker';

const ChangeModal = (props) => {
	const dispatch = useDispatch();
	
	const isUpdateChartModalShow = useSelector((state) => state.modals.isUpdateChartModalShow);

	const updatingChart = useSelector((state) => state.chart.chartForChange);
	
	let newChartTitle;
	let newChartType;
	let chartData = [];
	let newChartColors = [];
	if (updatingChart !== '') {
		newChartTitle = updatingChart.options.title.text;
		newChartType = updatingChart.options.chart.type
		chartData = _.cloneDeep(updatingChart.options.series);
	} 
	
	const setNewChartTitle = (e) => {
		newChartTitle = e.target.value;
	}

	const setNewChartType = (e) => {
		newChartType = e.target.value;
	}

	const setNewChartColor = (e, index) => {
		newChartColors[index] = e;
	}
	
	const setNewChartParameterName = (e, index) => {
		chartData[index].name = e.target.value;
	}

	const changeChart = () => {
		const { id, options } = _.cloneDeep(updatingChart);
		options.title.text = newChartTitle;
		options.chart.type = newChartType;
		options.series.forEach((serie, index) => {
			serie.name = chartData[index].name;
			if (newChartColors[index] !== undefined) {
				serie['color'] = newChartColors[index];
			}
		});
		newChartColors = [];
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
							<InputGroup className="mb-3" onInput={setNewChartTitle} >
								<Form.Control 
									placeholder="Enter New Chart Name"
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
						<Form.Group>
							{chartData.map((serie, index) =>
								<div key={index}>
									<hr />
									<Form.Label className="text-primary">Parameter name - {serie.name}</Form.Label>
									<InputGroup className="mb-3" onChange={(e) => setNewChartParameterName(e, index)}>
										<Form.Control 
											placeholder="Enter new parameter name"
											aria-label="chartName"
										/>
									</InputGroup>
									<Form.Label className="text-primary">Select new parameter color</Form.Label>
									<div className="colorPicker mb-3">
										<ColorPicker color={serie['color']} onChange={(e) => setNewChartColor(e, index)}/>
									</div>
								</div>
							)}
						</Form.Group>
				</Form>
			</Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={() => dispatch(updateChartModalShow())}>
          Cancel
        </Button>
        <Button variant="danger" onClick={changeChart}>
          Save Changes
        </Button>
      </Modal.Footer>
  </Modal>
  )
};

export default ChangeModal;
