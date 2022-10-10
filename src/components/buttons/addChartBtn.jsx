import React from 'react';
import { Button } from 'react-bootstrap';

const AddChartBtn = ({onClick}) => {
	return (
		<div className="d-flex sticky-top justify-content-center m-5">
			<Button variant="primary" onClick={onClick} >Add chart</Button>
		</div>
	)
};

export default AddChartBtn;