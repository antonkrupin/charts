import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-date-picker';

import { addDate } from '../slices/chartReducer';

const DateSelector = () => {
	const dispatch = useDispatch();

	const [value, onChange] = useState(new Date());
	//console.log(value.toLocaleDateString());
	
	useEffect(() => {
		console.log(value.toLocaleDateString());
	}, [value]);

	return (
		<>
			<DatePicker className="mb-3" onChange={onChange} value={value} />
		</>
	)
};

export default DateSelector;