import _ from 'lodash';
import { createSlice, current } from '@reduxjs/toolkit';
import { updateChartModalShow, deleteChartModalShow } from './modalsReducer';

const initialState = {
	charts: [],
	creationDates: [],
	chartsFilteredByDate: [],
	chartForChange: '',
	updatedChart: '',
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
			/*if (state.updatedChart === '') {
				state.updatedChart = state.charts[0];
			}*/
			/*if (state.chartForChange === '') {
				state.chartForChange = state.charts[0];
			}*/
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
			state.charts.forEach((chart, index) => {
				if (chart.id === id) {
					chart.options = options;
				}
			})
		},
		getChartForChange: (state, action) => {
			//console.log('test');
			const { id } = action.payload;
			//console.log(id);
		},
		deleteChart: (state, action) => {
			console.log(action.payload);
			state.charts.forEach((chart, index) => {
				if (chart.id === action.payload) {
					console.log(current(chart));
					state.charts.splice(index, 1);
				}
			})
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateChartModalShow, (state, action) => {
			const id = action.payload;
			state.charts.forEach((chart) => {
				if (chart.id === id) {
					state.chartForChange = chart;
				}
			});
		});
		builder.addCase(deleteChartModalShow, (state, action) => {
			console.log('__________');
			console.log(action.payload);
			console.log('___________');
		});
	}
});

export const {
	addChart,
	addDate,
	filterChartsByDate,
	getChartForChange,
	updateChart,
	deleteChart
} = chartSlice.actions;

export default chartSlice.reducer;
