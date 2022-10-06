import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Chart from '../components/chart';
import AlertMessage from '../components/alert';
import CreationDateFilter from '../components/creationDateFilter';

const ViewMode = () => {
	const location = useLocation().pathname;

	const charts = useSelector((state) => state.chart.charts);

	const chartsFilteredByDate = useSelector((state) => state.chart.chartsFilteredByDate);

	let chartsToRender;
	if (chartsFilteredByDate.length === 0) {
		chartsToRender = charts;
	} else {
		chartsToRender = chartsFilteredByDate;
	}
	// разобраться с ключем key при фильтрации
	return (
		<>
		<AlertMessage />
		<CreationDateFilter />
		<div className="d-flex flex-wrap justify-content-center">
			{ chartsToRender.map((chart, index) => <Chart key={index} options={chart.options} location={location}/>) }
		</div>
		</>
	)
}

export default ViewMode;