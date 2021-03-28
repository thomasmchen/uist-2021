import React, { useState, useEffect } from 'react'
import { Switch, Route } from "react-router-dom"
import SpansView from "../SpansView/SpansView"
import SummaryView from "../SummaryView/SummaryView"
import QAView from "../QAView/QAView"
import SpeakerView from "../SpeakerView/SpeakerView"
import './DataContainer.css'
import AboutView from '../AboutView/AboutView'


function DataContainer(props) {
    const [audioData, setAudioData] = useState(null)

    useEffect(() => {
        if (!props.audioName) return;

        const fetchData = () => {
            fetch(`../data/${props.audioName}.json`, {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    setAudioData(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        
        fetchData();
      }, [props.audioName]);

    return (
        <div className="DataContainer">
            <Switch>
                <Route path="/data/summary">
                    <SummaryView />
                </Route>
                <Route path="/data/spans">
                    <SpansView className="SpansView" audioName={props.audioName} audioData={audioData}/>
                </Route>
                <Route path="/data/qa">
                    <QAView />
                </Route>
                <Route path="/data/speaker">
                    <SpeakerView />
                </Route>
                <Route path="/static/about">
                    <AboutView />
                </Route>
            </Switch>
        </div>
    )
}

export default DataContainer