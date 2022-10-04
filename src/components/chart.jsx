import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { addChart, updateChart, deleteChart } from '../slices/chartReducer';

const Chart = (props) => {
	// const charts = useSelector((state) => state.chart.charts);
	const dispatch = useDispatch();

	const handleSomething = () => {
		dispatch(deleteChart(props.id));
	}
	return (
		<div className="flex-column m-1 border border-primary rounded">
			<HighchartsReact highcharts={Highcharts} options={props.options} />
			<Button className="m-2" variant="info">Change</Button>
			<Button onClick={handleSomething} className="m-2" variant="danger">Delete</Button>
		</div>
	)
}

export default Chart;