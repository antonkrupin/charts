import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';

import { filterChartsByDate } from '../slices/chartReducer';

const CreationDateFilter = () => {
	const dispatch = useDispatch();

	const creationDates = _.keys(useSelector((state) => state.chart.creationDates));
	
	/*const filterByDate = (e) => {
		const date = e.target.value;
		dispatch(filterChartsByDate({date}));
	}*/
	
	let dateFilter;
	if (creationDates.length === 0) {
		dateFilter = (
			<>
			</>
		)
	} else {
		dateFilter = (
			<div className="d-flex align-items-center">
			<h6 className="m-2">Filter by date</h6>
			<Form>
				<Form.Select aria-label="Filter by Creation Date" onChange={(e) => dispatch(filterChartsByDate(e.target.value))}>
					<option>all charts</option>
					{ creationDates.map((date, index) => <option key={index}>{date}</option>)}
				</Form.Select>			
			</Form>
		</div>
		)
	}

	return (
		<>
			{dateFilter}
		</>
	)
};

export default CreationDateFilter;