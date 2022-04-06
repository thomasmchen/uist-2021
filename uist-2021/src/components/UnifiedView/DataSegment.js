import React from 'react';
import classnames from 'classnames'
import { render } from "react-dom";
import { VictoryPie } from "victory";
import {VictoryContainer} from "victory";
import {VictoryTooltip} from "victory";

function Segment(props) {
    return (
          <div className="DetailDataDataContainer">
            {
                /*
                <p>Information Contained in this Summary: {(props.segment.information_contained*100).toFixed(2) }%</p>
                <p>Summary Quality: {(props.segment.quality * 100).toFixed(2)}%</p>
                <p>Total Info Displayed So Far: {props.totalInfo} our of {(100 - props.totalInfo).toFixed(2)}</p>
                */
            }
            <div className="DataVisContainer">
                <div className="DataVis">
                <VictoryPie 
                    height={300}
                    width={350}
                    containerComponent={<VictoryContainer responsive={false}/>}
                    data={[
                        {x: "Info Selected + Additional Info from Initial Summary", y:0},
                        {label: " ", y: props.segment.information_contained.toFixed(2)*100 },
                        {label: " ", y: props.segment.delta.toFixed(2)*100 },
                        {x: "Remaining Info", y: 100-((props.segment.information_contained.toFixed(2)*100)+(props.segment.delta.toFixed(2)*100))},
                    ]}
                    colorScale={["#212121","#BB86FC", "#40eb96d5","#212121"]}
                    animate={{
                        duration: 400
                      }}
                    innerRadius={50}
                    style={{
                        data: {
                          strokeWidth: 0
                        },
                        labels: {
                          fill: "white", font: ""
                        }
                    }}
                    />
                </div>
                <div className="DataVis">
                <VictoryPie 
                    height={300}
                    width={350}
                    containerComponent={<VictoryContainer responsive={false}/>}
                    data={[
                        {x: "Info Selected", y: props.segment.information_contained.toFixed(2)*100 },
                        {x: "Remaining Info", y: (1-props.segment.information_contained).toFixed(2)*100 },
                    ]}
                    colorScale={["#BB86FC","#212121"]}
                    style={{ labels: { fill: "white", font: "" } }}
                    animate={{
                        duration: 400
                      }}
                    innerRadius={50}
                />
                </div>
                <div className="DataVis">
                <VictoryPie 
                    height={300}
                    width={350}
                    containerComponent={<VictoryContainer responsive={false}/>}
                    data={[
                        {x: "Summary Quality", y:0},
                        {label: " ", y: props.segment.quality.toFixed(2)*100 },
                        {label: " ", y: (1-props.segment.quality).toFixed(2)*100 },
                    ]}
                    colorScale={["#212121","#03DAC6","#212121"]}
                    style={{ labels: { fill: "white", font: "" } }}
                    animate={{
                        duration: 400
                      }}
                      innerRadius={50}
                />
                </div>
            </div>
        </div>
    )
}
export default Segment