import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAddChartModalShow: false,
	isDeleteChartModalShow: false,
	isUpdateChartModalShow: false,
}

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		addChartModalShow: (state) => {
			state.isAddChartModalShow = !state.isAddChartModalShow;
		},
		deleteChartModalShow: (state) => {
			state.isDeleteChartModalShow = !state.isDeleteChartModalShow;
		},
		updateChartModalShow: (state) => {
			state.isUpdateChartModalShow = !state.isUpdateChartModalShow;
		},
	},
});

export const { 
	addChartModalShow,
	deleteChartModalShow,
	updateChartModalShow,
 } = modalsSlice.actions;

export default modalsSlice.reducer;