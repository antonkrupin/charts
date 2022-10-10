import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { addChartModalShow } from '../slices/modalsReducer.js';
import Chart from '../components/chart.jsx';
import AlertMessage from '../components/alert.jsx';
import AddChartModal from '../components/modals/addChart.jsx';
import DeleteModal from '../components/modals/deleteChart.jsx';
import ChangeModal from '../components/modals/changeChart.jsx';
import AddChartBtn from '../components/buttons/addChartBtn.jsx';

const Settings = () => {
	const charts = useSelector((state) => state.chart.charts);

	const location = useLocation().pathname;

	const dispatch = useDispatch();
	
	return (
		<>
			<AlertMessage location={location} />
			{/*<div className="d-flex sticky-top justify-content-center m-5">
				<Button variant="primary" onClick={() => dispatch(addChartModalShow())} >Add chart</Button>
	</div>*/}
			<AddChartBtn onClick={() => dispatch(addChartModalShow())}/>
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
