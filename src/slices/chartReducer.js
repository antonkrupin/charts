import _ from 'lodash';
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	charts: [],
	creationDates: [],
	chartsFilteredByDate: [],
	isModalShow: false,
	isDeleteModalShow: false,
	isUpdateModalShow: false,
	updatedChart: '',
}

const chartSlice = createSlice({
	name: 'chart',
	initialState,
	reducers: {
		changeModalShow: (state) => {
			state.isModalShow = !state.isModalShow;
		},
		changeDeleteModalShow: (state) => {
			state.isDeleteModalShow = !state.isDeleteModalShow;
		},
		changeUdateModalShow: (state, action) => {
			if (action.payload !== undefined) {
				const { id } = action.payload
				state.charts.forEach((chart, index) => {
					if (chart.id === id) {
						state.updatedChart = chart;
					}
				})
			}
			state.isUpdateModalShow = !state.isUpdateModalShow;
		},
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
			if (state.updatedChart === '') {
				state.updatedChart = state.charts[0];
			}
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
			const { id, options } = action.payload;
			console.log(id);
			state.charts.forEach((chart, index) => {
				if (chart.id === id) {
					chart.options = options;
				}
			})
		},
		deleteChart: (state, action) => {
			state.charts.forEach((chart, index) => {
				if (chart.id === action.payload) {
					console.log(current(state.charts[index]));
					state.charts.splice(index, 1);
				}
			})
		},
	},
});

export const { 
	changeModalShow,
	changeDeleteModalShow,
	changeUdateModalShow,
	addChart,
	addDate,
	filterChartsByDate, 
	updateChart,
	deleteChart
} = chartSlice.actions;

export default chartSlice.reducer;
