import React from 'react';
import classnames from 'classnames'

function Segment(props) {
    let adjustedStartTime = props.start - 2;
    let adjustedEndTime = props.end;

    return (
        <span className="SegmentText" >{props.text}</span>
    )
}
export default Segment