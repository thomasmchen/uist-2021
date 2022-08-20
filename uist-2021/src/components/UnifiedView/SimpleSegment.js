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
    
  if (props.phrase != null && props.isSelected) {
    const idx = props.text.indexOf(props.phrase)
    if (idx < 0 || props.phrase.length == 0) {
      return (<span className="SegmentText" >{props.text}{segmentEnd}</span>)
    }
    return (
        <span className="SegmentText" >
          <span>{props.text.substr(0, idx)}</span>
          <span onMouseEnter={() => {if (props.onExpand) {props.onExpand(props) }}}><mark>{props.text.substr(idx, props.phrase.length)}</mark></span>
          <span>{props.text.substr(idx + props.phrase.length, props.text.length)}</span>
          {segmentEnd}
        </span>
    )
  } else {
    return (<span className="SegmentText" >{props.text}{segmentEnd}</span>)
  }
}
export default Segment
