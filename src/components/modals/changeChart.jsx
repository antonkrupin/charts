import _ from 'lodash';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { changeUdateModalShow, updateChart, deleteChart } from '../../slices/chartReducer';

const ChangeModal = () => {
	const dispatch = useDispatch();
	
	const isUpdateModalShow = useSelector((state) => state.chart.isUpdateModalShow);

	const updatingChart = useSelector((state) => state.chart.updatedChart);
	
	const [chartTitle, setNewChartTitle] = useState(updatingChart.options.title.text);

	const [chartType, setNewChartTipe] = useState(updatingChart.options.chart.type)

	const handleChangeChartName = () => {
		const options = _.cloneDeep(updatingChart.options);
		options.title.text = chartTitle;
		options.chart.type = chartType;
		const { id } = updatingChart;
		dispatch(updateChart({id, options}));
		dispatch(changeUdateModalShow());
	}
	
	return (
    <Modal show={isUpdateModalShow} onHide={() => dispatch(changeUdateModalShow())}>
      <Modal.Header closeButton>
        <Modal.Title>Change Chart</Modal.Title>
      </Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
							<Form.Label className="text-primary">Chart name - {chartTitle}</Form.Label>
							<InputGroup onChange={(e) => setNewChartTitle(e.target.value)} >
								<Form.Control 
									placeholder="Enter Chart Name"
									aria-label="chartName"
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group>
							<Form.Label className="text-primary">Chart Type - {chartType}</Form.Label>
							<Form.Select className="mb-3" aria-label="Select Chart Type" onChange={(e) => setNewChartTipe(e.target.value)}>
								<option>Select new chart type</option>
								<option>line</option>
								<option>spline</option>
								<option>area</option>
								<option>bar</option>
								<option>pie</option>
							</Form.Select>
					</Form.Group>
				</Form>
			</Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={() => dispatch(changeUdateModalShow())}>
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