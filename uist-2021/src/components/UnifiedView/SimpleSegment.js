import React from 'react';
import classnames from 'classnames'

function Segment(props) {
    let adjustedStartTime = props.start - 2;
    let adjustedEndTime = props.end;
    let segmentEnd = '';

    if (props.text.slice(-1) === '.' || props.text.slice(-1) === '?'){
        segmentEnd = ' ';
    }

    return (
        <span className="SegmentText" >{props.text}{segmentEnd}</span>
    )
}
export default Segment