import React from 'react';
import { Alert } from 'react-bootstrap';

const Page404 = () => {
	return (
		<>
			<Alert className="text-center" variant="warning" >
				This is Page 404. <br/>Something go wrong.<br /><strong>Use links above to get right page.</strong>
			</Alert>
		</>
	)
}

export default Page404;