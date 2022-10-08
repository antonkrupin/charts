import _ from 'lodash';
import { createSlice, current } from '@reduxjs/toolkit';
import { updateChartModalShow, deleteChartModalShow } from './modalsReducer';

const initialState = {
	charts: [],
	creationDates: {},
	chartsFilteredByDate: [],
	chartForChange: '',
	chartForDeleteId: '',
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
			const { date } = action.payload;
			if (date in state.creationDates) {
				state.creationDates[date] += 1;
			} else {
				state.creationDates[date] = 1;
			}
		},
		filterChartsByDate: (state, action) => {
			const { date } = action.payload;
			state.chartsFilteredByDate = [];
			state.charts.forEach((chart, index) => {
				if (chart.date === date) {
					state.chartsFilteredByDate.push(state.charts[index]);
				}
			});
		},
		updateChart: (state, action) => {
			const { id, options } = action.payload;
			state.charts.forEach((chart) => {
				if (chart.id === id) {
					chart.options = options;
				}
			})
		},
		deleteChart: (state, action) => {
			state.charts.forEach((chart, index) => {
				if (chart.id === action.payload) {
					state.charts.splice(index, 1);
				}
			})
		},
		deleteDate: (state, action) => {
			const id = action.payload;
			let date;
			state.charts.forEach((chart) => {
				if (chart.id === id) {
					date = chart.date;
				}
			})
			state.creationDates[date] -= 1;
			if (state.creationDates[date] === 0) {
				delete state.creationDates[date];
			}
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
			state.chartForDeleteId = action.payload;
		});
	}
});

export const {
	addChart,
	addDate,
	filterChartsByDate,
	updateChart,
	deleteChart,
	deleteDate,
} = chartSlice.actions;

export default chartSlice.reducer;
