import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../slices/chartReducer.js';
import modalsReducer from '../slices/modalsReducer.js';

export default configureStore({
	reducer: {
		chart: chartReducer,
		modals: modalsReducer,
	},
});
