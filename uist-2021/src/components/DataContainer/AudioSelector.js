import React, { Component } from 'react';

class AudioSelector extends Component {

    render () {
        return (
            <div className="AudioSelectionContainer">
                <p className="CurrentAudioLabel">Currently Analyzing Audio: {this.props.selectedAudio}</p>
                <select 
                    className="AudioSelector"
                    name="AudioSelect"
                    onChange={e => this.props.onChange(e.target.value)}
                >
                    <option value="">Select an Audio</option>
                    {this.props.audios.map((audio) => (
                        <option key={audio.id}>
                        {audio.value}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}

export default AudioSelector