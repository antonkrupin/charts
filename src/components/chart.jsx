import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { deleteChartModalShow, updateChartModalShow } from '../slices/modalsReducer.js';

import '../styles/chart.css';

const Chart = (props) => {
	const { location, options, id, date } = props;

	const dispatch = useDispatch();
	
	let changeAndDeleteButtons;
	if (location === '/settings') {
		changeAndDeleteButtons = (
			<div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center">
				<Button onClick={() => dispatch(updateChartModalShow(id))} className="m-2" variant="info">Change</Button>
				<Button onClick={() => dispatch(deleteChartModalShow(id))} className="m-2" variant="danger">Delete</Button>
			</div>
		)
	}
	return (
		<div className="chart shadow rounded m-2 p-3">
			<h6 className="text-center">Creation date - {date}</h6>
			<div className="flex-column m-1">
				<HighchartsReact highcharts={Highcharts} options={options} />
				{ changeAndDeleteButtons }
			</div>
		</div>
	)
}

export default Chart;
