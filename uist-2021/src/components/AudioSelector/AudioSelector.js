import React, { Component } from 'react';
import './AudioSelector.css'

function AudioSelector(props) {
  const [checked, setChecked] = React.useState(true); 

  const handleCheck = (e) => {
    props.outer.setState({settings: {noMeters: checked}})
    setChecked(!checked)
  }

  return (
    <div className="AudioSelectionContainer">
    <p className="CurrentAudioLabel">Currently Analyzing Audio: <strong>{!props.selectedAudio ? <samp className="NoAudioSelectedText">No Audio Selected</samp> : props.selectedAudio}</strong></p>
    <div style={{display: "flex"}}><p>Show indicators?  </p><input type="checkbox" checked={checked} onChange={handleCheck}/></div>
    <div>
    <label className="SelectAudioLabel">Select an Audio:</label>
    <select 
    className="AudioSelector"
    name="AudioSelect"
    onChange={e => props.onChange(e.target.value)}
    >
    <option defaultValue selected disabled>Please Select An Audio</option>
    {props.audios.map((audio) => (
      <option key={audio.id}>
      {audio.value}
      </option>
    ))}
    </select>
    </div>
    </div>
  )
}

export default AudioSelector
