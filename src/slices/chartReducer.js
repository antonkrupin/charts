import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	charts: [],
}

const chartSlice = createSlice({
	name: 'chart',
	initialState,
	reducers: {
		addChart: (state, action) => {
			const id = _.uniqueId();
			const { title, type } = action.payload;
			state.charts.push({
				id,
				options: {
					chart: {
						type: type,
					},
					title: {
						text: title,
					},
					series: [
						{	
							name: 'First',
							data: [1, 2, 1, 4, 3, 6,20,15,33],
						},
						{
							name: 'Second',
							data: [2, 4, 5, 1, 8, 9],
						},
						{
							name: 'Third',
							data: [0, 10, 2, 1, 10, 12],
						}
					]
				}
			})
		},
		updateChart: (state) => {

		},
		deleteChart: (state) => {

		},
	},
});

export const { addChart, updateChart, deleteChart } = chartSlice.actions;

export default chartSlice.reducer;

/*

const options = {
		chart: {
			type: 'spline'
		},
		title: {
			text: 'My chart'
		},
		series: [
			{	
				name: 'First',
				data: [1, 2, 1, 4, 3, 6],
			},
			{
				name: 'Second',
				data: [2, 4, 5, 1, 8, 9],
			},
			{
				name: 'Third',
				data: [0, 10, 2, 1, 10, 12],
			}
		]
	};

	charts = [{id, type, title}],
	chartsData = [{id, lines: {name, data:[]}}]

*/