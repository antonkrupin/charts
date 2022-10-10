import _ from 'lodash';

import { createSlice } from '@reduxjs/toolkit';
import { updateChartModalShow, deleteChartModalShow } from './modalsReducer.js';

const initialState = {
	charts: JSON.parse(localStorage.getItem('charts')) || [],
	creationDates: JSON.parse(localStorage.getItem('creationDates')) || {},
	chartsFilteredByDate: [],
	chartForChange: '',
	chartForDeleteId: '',
	sessionPrefix: Date.now(),
};

const chartSlice = createSlice({
	name: 'chart',
	initialState,
	reducers: {
		addChart: (state, action) => {
			const id = _.uniqueId(state.sessionPrefix);

			const { title, type, series, date } = action.payload;
			// const test = localStorage.getItem('charts');
			/*if (!localStorage.getItem('sessionPrefix')) {
				localStorage.setItem('sesionPrefix', id);
			}*/
			if (!localStorage.getItem('charts')) {
				localStorage.setItem('charts', JSON.stringify([]));
			}
			const charts = JSON.parse(localStorage.getItem('charts'));
			charts.unshift({
				id,
				date,
				options: {
					accessibility: {
						enabled: false,
					},
					chart: {
						type: type,
					},
					title: {
						text: title,
					},
					series: series,
				}
			});
			localStorage.setItem('charts', JSON.stringify(charts));
			state.charts = JSON.parse(localStorage.getItem('charts'));
			/*state.charts.unshift({
				id,
				date,
				options: {
					accessibility: {
						enabled: false,
					},
					chart: {
						type: type,
					},
					title: {
						text: title,
					},
					series: series,
				}
			});*/
		},
		addDate: (state, action) => {
			if (!localStorage.getItem('creationDates')) {
				localStorage.setItem('creationDates', JSON.stringify({}));
			}
			const { date } = action.payload;
			
			const creationDates = JSON.parse(localStorage.getItem('creationDates'));
			if (date in creationDates) {
				creationDates[date] += 1;
			} else {
				creationDates[date] = 1;
			}
			localStorage.setItem('creationDates', JSON.stringify(creationDates));
			state.creationDates = JSON.parse(localStorage.getItem('creationDates'));
			/* if (date in state.creationDates) {
				state.creationDates[date] += 1;
			} else {
				state.creationDates[date] = 1;
			} */
		},
		filterChartsByDate: (state, action) => {
			const date = action.payload;
			state.chartsFilteredByDate = [];
			state.charts.forEach((chart, index) => {
				if (chart.date === date) {
					state.chartsFilteredByDate.push(state.charts[index]);
				}
			});
		},
		updateChart: (state, action) => {
			const charts = JSON.parse(localStorage.getItem('charts'));
			const { id, options } = action.payload;
			charts.forEach((chart) => {
				if (chart.id === id) {
					chart.options = options;
				}
			});
			localStorage.setItem('charts', JSON.stringify(charts));
			state.charts = JSON.parse(localStorage.getItem('charts'));

			//state.creationDates = JSON.parse(localStorage.getItem('creationDates'));
			/*state.charts.forEach((chart) => {
				if (chart.id === id) {
					chart.options = options;
				}
			});*/
		},
		deleteChart: (state, action) => {
			const charts = JSON.parse(localStorage.getItem('charts'));
			charts.forEach((chart, index) => {
				if (chart.id === action.payload) {
					charts.splice(index, 1);
				}
			});
			localStorage.setItem('charts', JSON.stringify(charts));
			state.charts = JSON.parse(localStorage.getItem('charts'))
			/* state.charts.forEach((chart, index) => {
				if (chart.id === action.payload) {
					state.charts.splice(index, 1);
				}
			}); */
		},
		deleteDate: (state, action) => {
			const id = action.payload;
			let date;
			state.charts.forEach((chart) => {
				if (chart.id === id) {
					date = chart.date;
				}
			});

			/* state.creationDates[date] -= 1;
			if (state.creationDates[date] === 0) {
				delete state.creationDates[date];
			} */
			// test
			const creationDates = JSON.parse(localStorage.getItem('creationDates'));
			creationDates[date] -= 1;
			if (!creationDates[date]) {
				delete creationDates[date];
			}
			localStorage.setItem('creationDates', JSON.stringify(creationDates));
			state.creationDates = JSON.parse(localStorage.getItem('creationDates'));
			// test
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
