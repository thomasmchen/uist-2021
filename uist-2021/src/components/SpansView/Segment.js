import React from 'react';

function Segment(props) {
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
                    <p className="SegmentTextText">{props.text}</p>
                </div>
            </div>
        </div>
    )
}
export default Segment