import React from 'react';
import Speech from './Speech'
import "./SpeakerView.css"

function SpeakerView(props) {
    if (!props.audioData) {
        return (
            <div>
                <h1>Speaker View</h1>
                <p>No audio sample selected</p>
            </div>
        )
    }

    return (
        <div className="SpeakerParentContainer">
            <div className="SpeakerTitleContainer">
                <h2 className="FirstSpeakerTitle">First Speaker</h2>
                <h2 className="SecondSpeakerTitle">Second Speaker</h2>
            </div>
            <div className="SpeakerDataContainer">
                { props.audioData["raw"]["segments"]
                    .map((segment, idx) =>
                        <div key={idx}>
                            <Speech text={segment.text} speaker={segment.speaker}></Speech>
                        </div>
                ) }
            </div>
        </div>
    )
}
export default SpeakerView