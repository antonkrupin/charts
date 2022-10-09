import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Chart from '../components/chart.jsx';
import AlertMessage from '../components/alert.jsx';
import CreationDateFilter from '../components/creationDateFilter.jsx';

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
	
	return (
		<>
			<AlertMessage location={location} />
			<CreationDateFilter />
			<div className="d-flex flex-wrap justify-content-center mt-5">
				{ chartsToRender.map((chart, index) => <Chart key={index} options={chart.options} location={location} date={chart.date}/>) }
			</div>
		</>
	)
}

export default ViewMode;