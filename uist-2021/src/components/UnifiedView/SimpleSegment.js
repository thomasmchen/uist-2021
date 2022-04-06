import React from 'react';
import classnames from 'classnames'

function Segment(props) {
    var Highlight = require('react-highlighter');
    let adjustedStartTime = props.start - 2;
    let adjustedEndTime = props.end;
    let segmentEnd = '';

    if (props.text.slice(-1) === '.' || props.text.slice(-1) === '?'){
        segmentEnd = ' ';
    }

    return (
        (props.phrase != null && props.isSelected) ?
        <span className="SegmentText" ><Highlight className="SegmentText" search={props.phrase}>{props.text}</Highlight>{segmentEnd}</span>
        :
        <span className="SegmentText" >{props.text}{segmentEnd}</span>
    )
}
export default Segment