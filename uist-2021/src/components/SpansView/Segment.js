import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

function Segment(props) {
    var Highlight = require('react-highlighter');
    let adjustedStartTime = props.start - 2;
    let adjustedEndTime = props.end - 1;

    return (
        <div className="Segment">
            <div className = "SegmentDataContainer">
                {props.speaker != null &&
                        <div className="SegmentSpeakerContainer">
                            {
                                props.start && props.end && 
                                (   
                                    <div className="SegmentAudioContainer">
                                        <audio className="AudioPlayer" src={"http://dev.thomaschen.org/uist2021/" + props.audioName + ".mp3#t=" + adjustedStartTime + "," + adjustedEndTime} controls/>
                                    </div>
                                )
                            }
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