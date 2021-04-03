import React from 'react';

function Speech(props) {
    return (
        <div className="Speech">
            <div className={(props.speaker === "0") ? "LeftSpeakerContainer" : "RightSpeakerContainer"}>
                <p className={(props.speaker === "0") ? "LeftText" : "RightText"}>{props.text}</p>
            </div>
        </div>
    )
}
export default Speech