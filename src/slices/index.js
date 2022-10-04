import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../slices/chartReducer';

export default configureStore({
	reducer: {
		chart: chartReducer,
	},
});