import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';

import { filterChartsByDate } from '../slices/chartReducer';

const CreationDateFilter = () => {
	const creationDates = useSelector((state) => state.chart.creationDates);

	const dispatch = useDispatch();

	const handleDateFilter = (e) => {
		const date = e.target.value;
		dispatch(filterChartsByDate({date}));
	}
	
	let dateFilter;
	if (creationDates.length === 0) {
		dateFilter = (
			<>
			</>
		)
	} else {
		dateFilter = (
			<>
			<h6>Filter by date</h6>
			<Form>
				<Form.Select className="mb-3" aria-label="Filter by Creation Date" onChange={handleDateFilter}>
					<option>select date</option>
					{ creationDates.map((date, index) => <option key={index}>{date}</option>)}
				</Form.Select>			
			</Form>
		</>
		)
	}

	return (
		<>
			{dateFilter}
		</>
	)
};

export default CreationDateFilter;