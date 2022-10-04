import React from 'react';
import { Button } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = (props) => {
	const handleSomething = (e) => {
		console.log(props.id);
	}
	return (
		<div className="flex-column m-1 border border-primary rounded">
			<HighchartsReact highcharts={Highcharts} options={props.options} />
			<Button onClick={handleSomething} className="m-2" variant="info">Change</Button>
			<Button onClick={handleSomething} className="m-2" variant="danger">Delete</Button>
		</div>
	)
}

export default Chart;