import React from 'react';
import classnames from 'classnames'

function Segment(props) {
    let adjustedStartTime = props.start == 0 ? props.start : props.start - 2;
    let adjustedEndTime = props.end;

    return (
        <div className="AudioSegment">
            {
                props.start && props.end && 
                (   
                    <div className="AudioSegmentPlayerContainer">
                        <audio id="player" className="AudioPlayer" src={"http://dev.thomaschen.org/uist2021/" + props.audioName + ".mp3#t=" + adjustedStartTime + "," + adjustedEndTime} controls/>
                        {
                            /*
                            TODO: Fix prop loading order bug
                            <div className="AudioControls"> 
                            <button onclick={document.getElementById('player').play()}>Play</button> 
                            <button onclick={document.getElementById('player').pause()}>Pause</button> 
                            <button onclick={document.getElementById('player').volume != 1.0 ? document.getElementById('player').volume += 0.1 : document.getElementById('player').volume = 1.0}>Vol +</button> 
                            <button onclick={document.getElementById('player').volume -= 0.1}>Vol -</button> 
                            </div>
                            */
                        }
                    </div>
                )
            }
        </div>
    )
}
export default Segment