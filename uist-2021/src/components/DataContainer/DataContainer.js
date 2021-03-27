import React, { useState, useEffect } from 'react'
import { Switch, Route } from "react-router-dom"
import AboutView from '../AboutView/AboutView'
import SpansView from "../SpansView/SpansView"
import SummaryView from "../SummaryView/SummaryView"
import QAView from "../QAView/QAView"
import SpeakerView from "../SpeakerView/SpeakerView"
import './DataContainer.css'


function DataContainer(props) {
    const [audioData, setAudioData] = useState(null)

    useEffect(() => {
        if (!props.audioName) return;
    
        // load audio data
        fetch(`../data/${props.audioName}.json`, {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }).then(response => {
            return response.json();
          }).then(data => {
            setAudioData(data)
            console.log(data);
          }).catch(err => {
            console.log("Error Reading data " + err);
          });
    })

    return (
        <div className="DataContainer">
            <Switch>
                <Route path="/summary">
                    <SummaryView />
                </Route>
                <Route path="/spans">
                    <SpansView className="SpansView" audioName={props.audioName} audioData={audioData}/>
                </Route>
                <Route path="/qa">
                    <QAView />
                </Route>
                <Route path="/speaker">
                    <SpeakerView />
                </Route>
                <Route path="/about">
                    <AboutView />
                </Route>
            </Switch>
        </div>
    )
}

export default DataContainer