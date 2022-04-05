import React from 'react';
import classnames from 'classnames'
import { render } from "react-dom";
import { VictoryPie } from "victory";
import {VictoryContainer} from "victory";

function Segment(props) {
    return (
        <div className="DetailDataDataContainer">
            {
                /*
                <p>Information Contained: {props.segment.information_contained.toFixed(2)*100 }/{(1-props.segment.information_contained).toFixed(2)*100}</p>
                <p>Quality: {(props.segment.quality * 100).toFixed(2)}</p>
                <p>{(props.totalInfo)}/{100-props.totalInfo}</p>
                */
            }
            <div className="DataVisContainer">
                <div className="DataVis">
                <VictoryPie 
                    height={350}
                    width={400}
                    containerComponent={<VictoryContainer responsive={false}/>}
                    data={[
                        {label: "Info Selected", y: props.segment.information_contained.toFixed(2)*100, x:props.segment.quality.toFixed(2)*100 },
                        {label: "Total Info", y: (1-props.segment.information_contained).toFixed(2)*100, x:1 },
                    ]}
                    colorScale={["#BB86FC","#212121"]}
                    style={{ labels: { fill: "white", font: "" } }}
                    animate={{
                        duration: 400
                      }}
                />
                </div>
                <div className="DataVis">
                <VictoryPie 
                    height={350}
                    width={400}
                    containerComponent={<VictoryContainer responsive={false}/>}
                    data={[
                        {label: "Quality", y: props.segment.quality.toFixed(2)*100 },
                        {label: " ", y: (1-props.segment.quality).toFixed(2)*100 },
                    ]}
                    colorScale={["#03DAC6","#212121"]}
                    style={{ labels: { fill: "white", font: "" } }}
                    animate={{
                        duration: 400
                      }}
                />
                </div>
            </div>
        </div>
    )
}
export default Segment