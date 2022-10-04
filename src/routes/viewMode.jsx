import { useSelector } from 'react-redux';

import Chart from '../components/chart';
import AlertMessage from '../components/alert';

const ViewMode = () => {
	const charts = useSelector((state) => state.chart.charts);
	
	return (
		<>
		<AlertMessage />
		<div className="d-flex flex-wrap justify-content-center">
			{ charts.map((chart) => <Chart key={chart.id} options={chart.options} />) }
		</div>
		</>
	)
}

export default ViewMode;