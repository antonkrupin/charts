import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const AlertMessage = () => {
	const charts = useSelector((state) => state.chart.charts);
	
	if (charts.length === 0) {
		return ( <Alert variant="warning">
		You have no Charts. To add Chart - click button "Add chart"
		</Alert>
		)
	}

};

export default AlertMessage;