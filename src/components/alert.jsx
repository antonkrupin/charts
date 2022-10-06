import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const AlertMessage = () => {
	const charts = useSelector((state) => state.chart.charts);
	const location = useLocation();
	
	let alertText = 'You have no Charts. Go to Settings, to Add Chart';
	if (location.pathname === '/settings') {
		alertText = 'To add Chart - click button Add chart';
	}

	if (charts.length === 0) {
		return ( <Alert className="text-center" variant="warning" >
			{alertText}
		</Alert>
		)
	}

};

export default AlertMessage;