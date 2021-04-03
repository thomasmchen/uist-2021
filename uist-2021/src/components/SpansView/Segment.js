import React from 'react';

function Segment(props) {
    var Highlight = require('react-highlighter');

    return (
        <div className="Segment">
            <div className = "SegmentDataContainer">
                {props.speaker != null &&
                        <div className="SegmentSpeakerContainer">
                            <p className="SegmentSpeakerText">Speaker {props.speaker}</p>
                        </div>
                }
                <div className="SegmentIdContainer">
                    <p className="SegmentIdText">{props.id}</p>
                </div>
                <div className={"SegmentTextContainer"}>
                    {
                        (props.phrase != null && props.isSelected) ?
                        <Highlight className="SegmentTextText" search={props.phrase}>{props.text}</Highlight>
                        :
                        <p className="SegmentTextText">{props.text}</p>
                    }
                </div>
            </div>
        </div>
    )
}
export default Segment