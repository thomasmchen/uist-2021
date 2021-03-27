import Navbar from "./components/Navbar/Navbar"
import DataContainer from "./components/DataContainer/DataContainer"
import AudioSelector from "./components/AudioSelector/AudioSelector"
import AudioIndexData from "./data/index.json"
import { BrowserRouter as Router } from "react-router-dom"
import './App.css';
import React from "react"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audios: AudioIndexData,
      selectedAudio: ""
    }
  }

  handleChange = audio => {
    if (audio === "") {
        this.setState({ selectedAudio: ""})
        this.setState({ selectedAudioData: ""})
        return;
    }

    this.setState({ selectedAudio: audio });
  }

  render() {
    return(
      <div className="App">
        <Router>
          <Navbar/>
          <AudioSelector audios={this.state.audios} selectedAudio={this.state.selectedAudio} onChange={this.handleChange} />
          <DataContainer audioName={this.state.selectedAudio}/>
        </Router>
      </div>
    )
  }
};

export default App;
