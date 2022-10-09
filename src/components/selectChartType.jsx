import React from 'react';
import { Form } from 'react-bootstrap';

const SelectChartType = ({ onChange, modal, chartType }) => {
	let title;
	if (modal === 'addChart') {
		title = 'Select Chart type';
	} else {
		title = `Chart Type - ${chartType}`;
	}
	return (
		<>
			<Form.Group>
				<Form.Label className="text-primary">{title}</Form.Label>
				<Form.Select className="mb-3" aria-label="Select Chart Type" onChange={onChange}>
					<option>Select chart type</option>
					<option>line</option>
					<option>spline</option>
					<option>area</option>
					<option>bar</option>
					<option>pie</option>
				</Form.Select>
			</Form.Group>
		</>
	)
};

export default SelectChartType;