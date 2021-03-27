import React, { Component } from 'react';

class AudioTextData extends Component {
    render () {
        return (
            <div>
                <p>Rendering {this.props.audioName}</p>
                <code>{JSON.stringify(this.props.audioData)}</code>
            </div>
        )
    }
}
export default AudioTextData