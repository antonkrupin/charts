import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { addChart, updateChart, deleteChart } from '../slices/chartReducer';

const Chart = (props) => {
	const { location, options } = props;

	const dispatch = useDispatch();

	const handleSomething = () => {
		dispatch(deleteChart(props.id));
	}

	let buttons;
	if (location === '/settings') {
		buttons = (
			<>
			<Button className="m-2" variant="info">Change</Button>
			<Button onClick={handleSomething} className="m-2" variant="danger">Delete</Button>
			</>
		)
	}
	return (
		<div className="flex-column m-1 border border-primary">
			<HighchartsReact highcharts={Highcharts} options={options} />
			{ buttons }
		</div>
	)
}

export default Chart;

/*

<Button className="m-2" variant="info">Change</Button>
			<Button onClick={handleSomething} className="m-2" variant="danger">Delete</Button>

*/