import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { deleteChartModalShow, updateChartModalShow } from '../slices/modalsReducer';
import '../styles/chart.css';

const Chart = (props) => {
	const { location, options, id } = props;

	const dispatch = useDispatch();
	
	let changeAndDeleteButtons;
	if (location === '/settings') {
		changeAndDeleteButtons = (
			<div>
			<Button onClick={() => dispatch(updateChartModalShow(id))} className="m-2" variant="info">Change</Button>
			<Button onClick={() => dispatch(deleteChartModalShow(id))} className="m-2" variant="danger">Delete</Button>
			</div>
		)
	}
	return (
		<div className="chart shadow rounded p-3 m-2">
			<h6 className="text-center">Creation date - {props.date}</h6>
			<div className="flex-column m-1">
				<HighchartsReact highcharts={Highcharts} options={options} />
				{ changeAndDeleteButtons }
			</div>
		</div>
	)
}

export default Chart;
