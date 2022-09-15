import React from 'react';
import classnames from 'classnames'
import { render } from "react-dom";
import { VictoryChart, VictoryPie, VictoryBar, VictoryAxis } from "victory";
import {VictoryContainer} from "victory";
import {VictoryTooltip} from "victory";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Segment(props) {
	const value = props.segment.quality.toFixed(2)*100

	const labels = [""];
	const data = {
		labels,
		datasets: [
			{
				label: '',
				data: [value],
        borderRadius: 20,
//				borderColor: "red",
				backgroundColor: "#07B6A5",
			}
		]
	};
	const config = {
		type: 'bar',
    data: data,
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          min: 0,
          max: 100,
        }
      },
      indexAxis: 'y',
			// Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide
			elements: {
				bar: {
					borderWidth: 0,
				}
			},
			responsive: true,
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: false,
					text: 'Summary Quality'
				}
			}
		},
	};

  return (
     <div className="DetailDataDataContainer">
      <div style={{flex: 1}}>
        <span>Summary Quality</span>
        <div style={{height: 100}}>
          <Bar
            {...config}
          />
        </div>
      </div>
    </div>
  )
}
export default Segment
