import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const AlertMessage = (props) => {
	const { location } = props;
	const charts = useSelector((state) => state.chart.charts);
	
	let alertText = 'You have no Charts. Go to Settings, to Add Chart';
	if (location === '/settings') {
		alertText = 'To add Chart - click button Add chart';
	}

	if (charts.length === 0) {
		return ( 
			<Alert className="text-center" variant="warning" >
				{alertText}
			</Alert>
		)
	}

};

export default AlertMessage;