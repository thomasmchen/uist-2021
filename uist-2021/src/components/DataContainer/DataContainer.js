import React, { Component } from 'react';
import AudioSelector from "./AudioSelector"
import AudioTextData from "./AudioTextData"
import AudioIndexData from "../../data/index.json"
import './DataContainer.css'

class DataContainer extends Component {

    state = {
        audios: AudioIndexData,
        selectedAudio: "",
        selectedAudioData: {}
    }

    handleChange = audio => {
        this.setState({ selectedAudio: audio });
        fetch(`./data/${audio}.json`
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }).then(response => {
            console.log(response);
            return response.json();
          }).then(data => {
            this.setState({ selectedAudioData: data })
            console.log(this.state.selectedAudioData);
          }).catch(err => {
            console.log("Error Reading data " + err);
          });
    }

    render () {
        return (
            <div>
                <AudioSelector audios={this.state.audios} selectedAudio={this.state.selectedAudio} onChange={this.handleChange} />
                <AudioTextData className="AudioTextData" audioName={this.state.selectedAudio} audioData={this.state.selectedAudioData}/>
            </div>
        )
    }
}

export default DataContainer