import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = () => {
	const options = {
		chart: {
			type: 'spline'
		},
		title: {
			text: 'My chart'
		},
		series: [
			{	
				name: 'First',
				data: [1, 2, 1, 4, 3, 6],
			},
			{
				name: 'Second',
				data: [2, 4, 5, 1, 8, 9],
			},
			{
				name: 'Third',
				data: [0, 10, 2, 1, 10, 12],
			}
		]
	};

	const charts = useSelector((state) => state.chart.charts);
	const dispatch = useDispatch();
	const location = useLocation();
	
	return (
		<div className="flex-column m-1 border border-primary rounded">
			<HighchartsReact highcharts={Highcharts} options={options} />
			<Button className="m-2" variant="info">Change</Button>
			<Button className="m-2" variant="danger">Delete</Button>
		</div>
	)
}

export default Chart;