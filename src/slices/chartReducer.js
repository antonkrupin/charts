import _ from 'lodash';
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	charts: [],
	creationDates: [],
	chartsFilteredByDate: [],
}

const chartSlice = createSlice({
	name: 'chart',
	initialState,
	reducers: {
		addChart: (state, action) => {
			const id = _.uniqueId();
			const { title, type, chartData, linesName, date } = action.payload;
			const series = [];
			chartData.forEach((line, index) => {
				const temp = linesName[index];
				series.push({name:`${temp}`, data:line});
			})
			if (state.creationDates.indexOf(date) === -1) {
				state.creationDates.push(date);
			}
			state.charts.push({
				id,
				date,
				options: {
					chart: {
						type: type,
					},
					title: {
						text: title,
					},
					series: series,
				}
			})
		},
		addDate: (state, action) => {
			console.log(action.payload);
		},
		filterChartsByDate: (state, action) => {
			const { date } = action.payload;
			state.chartsFilteredByDate = [];
			state.charts.forEach((el, index) => {
				if (el.date === date) {
					state.chartsFilteredByDate.push(state.charts[index]);
				}
			});
		},
		updateChart: (state, action) => {
			
		},
		deleteChart: (state, action) => {
			state.charts.forEach((el, index) => {
				if (el.id === action.payload) {
					state.charts.splice(index, 1);
				}
			})
		},
	},
});

export const { addChart, addDate, filterChartsByDate, updateChart, deleteChart } = chartSlice.actions;

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