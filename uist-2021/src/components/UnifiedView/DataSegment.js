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
//				borderColor: "red",
				backgroundColor: "#07B6A5",
			}
		]
	};
	const config = {
		type: 'bar',
    data: data,
    options: {
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
      {
        /*
        <p>Information Contained in this Summary: {(props.segment.information_contained*100).toFixed(2) }%</p>
        <p>Summary Quality: {(props.segment.quality * 100).toFixed(2)}%</p>
        <p>Total Info Displayed So Far: {props.totalInfo} our of {(100 - props.totalInfo).toFixed(2)}</p>
        */
      }
      <div>
        <span>Summary Quality</span>
        <Bar
          {...config}
        />
      </div>
    </div>
  )
}
export default Segment
