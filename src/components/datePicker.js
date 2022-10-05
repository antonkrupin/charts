import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

const DateSelector = () => {
	const [value, onChange] = useState(new Date());
	return (
		<div>
			<DatePicker className="mb-3" onChange={onChange} value={value} />
		</div>
	)
};

export default DateSelector;