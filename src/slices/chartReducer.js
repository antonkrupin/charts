import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	charts: {},
}

const chartSlice = createSlice({
	name: 'chart',
	initialState,
	reducers: {
		addChart: (state) => {

		},
		updateChart: (state) => {

		},
		deleteChart: (state) => {

		},
	},
});

export const { addChart, updateChart, deleteChart } = chartSlice.actions;

export default chartSlice.reducer;