import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { addChartModalShow } from '../slices/modalsReducer';
import Chart from '../components/chart';
import AlertMessage from '../components/alert';
import AddChartModal from '../components/modals/addChart';
import DeleteModal from '../components/modals/deleteChart';
import ChangeModal from '../components/modals/changeChart';

const Settings = () => {
	const charts = useSelector((state) => state.chart.charts);

	const location = useLocation().pathname;

	const dispatch = useDispatch();
	
	return (
		<>
			<AlertMessage location={location} />
			<div className="d-flex justify-content-center m-5">
				<Button variant="primary" onClick={() => dispatch(addChartModalShow())} >Add chart</Button>
			</div>
			<div className="d-flex flex-wrap justify-content-center">
				{ charts.map((chart) => <Chart key={chart.id} options={chart.options} id={chart.id} location={location} date={chart.date}/>) }
			</div>
			<AddChartModal />
			<DeleteModal  />
			<ChangeModal  />
		</>
	)
};

export default Settings;
