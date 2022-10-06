import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { changeModalShow } from '../slices/chartReducer';
import Chart from '../components/chart';
import AlertMessage from '../components/alert';
import AddChartModal from '../components/modals/addChart';

const Settings = () => {
	const charts = useSelector((state) => state.chart.charts);

	const location = useLocation().pathname;

	const dispatch = useDispatch();
	
	return (
		<>
			<AlertMessage />
			<div className="d-flex justify-content-center m-5">
				<Button variant="primary" onClick={() => dispatch(changeModalShow())} >Add chart</Button>
			</div>
			<div className="d-flex flex-wrap justify-content-center">
				{ charts.map((chart) => <Chart key={chart.id} options={chart.options} id={chart.id} location={location}/>) }
			</div>
			<AddChartModal />
		</>
	)
};

export default Settings;
