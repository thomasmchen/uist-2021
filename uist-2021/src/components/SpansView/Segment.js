import React from 'react';

function Segment(props) {
    return (
        <div className="Segment">
            <div className = "SegmentDataContainer">
                <div className="SegmentIdContainer">
                    <p className="SegmentIdText">{props.id}</p>
                </div>
                <div className="SegmentTextContainer">
                    <p className="SegmentTextText">{props.text}</p>
                </div>
            </div>
        </div>
    )
}
export default Segment