import React from 'react';
import classnames from 'classnames'

function Segment(props) {
    var Highlight = require('react-highlighter');
    let adjustedStartTime = props.start - 2;
    let adjustedEndTime = props.end;

    return (
        <div className="Segment">
            <div className = {(props.sequence != null) ? "SegmentDataContainer" : "SegmentDataContainerWithoutId"}>
                {props.speaker != null &&
                        <div className={"SegmentSpeakerContainer"}>
                            {
                                props.start && props.end && 
                                (   
                                    <div className="SegmentAudioContainer">
                                        <audio className="AudioPlayer" src={"http://dev.thomaschen.org/uist2021/" + props.audioName + ".mp3#t=" + adjustedStartTime + "," + adjustedEndTime} controls/>
                                    </div>
                                )
                            }
                            <p className={classnames({"SegmentSpeakerTime": !props.label}, {"SegmentSpeakerText1": props.speaker === "0"}, {"SegmentSpeakerText2": props.speaker === "1"})}>{props.label} {props.speaker}</p>
                        </div>
                }
                {
                    props.sequence != null ? (
                    <div className={"SegmentIdContainer"}>
                        <p className="SegmentIdText">{props.sequence}</p>
                    </div>) : <div></div>
                }
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