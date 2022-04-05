import React from "react";
import { render } from "react-dom";
import { VictoryPie } from "victory";

function Segment(props) {
    return (
        <div className="DataVisContainer">
            <VictoryPie
            data={[
                { label: "Information Selected", x:1, y: props.segment.information_contained.toFixed(2)*100 },
                { label: "Remaining Information", x:2, y: (1-props.segment.information_contained).toFixed(2)*100 },
            ]}
            colorScale={["#BB86FC","#212121"]}
            style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
            />
        </div>
    )
}
export default Segment