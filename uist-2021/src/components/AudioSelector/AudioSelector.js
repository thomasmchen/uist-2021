import React, { Component } from 'react';
import './AudioSelector.css'

class AudioSelector extends Component {
    render () {
        return (
            <div className="AudioSelectionContainer">
                <p className="CurrentAudioLabel">Currently Analyzing Audio: <strong>{!this.props.selectedAudio ? <samp className="NoAudioSelectedText">No Audio Selected</samp> : this.props.selectedAudio}</strong></p>
                <div>
                    <label className="SelectAudioLabel">Select an Audio:</label>
                    <select 
                        className="AudioSelector"
                        name="AudioSelect"
                        onChange={e => this.props.onChange(e.target.value)}
                    >
                        <option defaultValue selected disabled>Please Select An Audio</option>
                        {this.props.audios.map((audio) => (
                            <option key={audio.id}>
                            {audio.value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}

export default AudioSelector