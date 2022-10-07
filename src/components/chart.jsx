import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { deleteChartModalShow, updateChartModalShow } from '../slices/modalsReducer';
import DeleteModal from './modals/deleteChart';
import ChangeModal from './modals/changeChart';

const Chart = (props) => {
	const { location, options, id } = props;

	const dispatch = useDispatch();
	
	let changeAndDeleteButtons;
	if (location === '/settings') {
		changeAndDeleteButtons = (
			<>
			<Button onClick={() => dispatch(updateChartModalShow(id))} className="m-2" variant="info">Change</Button>
			<Button onClick={() => dispatch(deleteChartModalShow(id))} className="m-2" variant="danger">Delete</Button>
			</>
		)
	}
	return (
		<div className="flex-column m-1 border border-primary">
			<HighchartsReact highcharts={Highcharts} options={options} />
			{ changeAndDeleteButtons }
			<DeleteModal id={id} />
			<ChangeModal id={id}/>
		</div>
	)
}

export default Chart;

/*

<Button className="m-2" variant="info">Change</Button>
			<Button onClick={handleSomething} className="m-2" variant="danger">Delete</Button>

*/