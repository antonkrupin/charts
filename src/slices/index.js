import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../slices/chartReducer';
import modalsReducer from '../slices/modalsReducer';

export default configureStore({
	reducer: {
		chart: chartReducer,
		modals: modalsReducer,
	},
});