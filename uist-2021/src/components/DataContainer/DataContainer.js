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

    // fetch data on audioName change
    let { audioName } = props;
    useEffect(() => {
        if (!audioName) return;

        const fetchData = () => {
            fetch(`../data/${audioName}.json`, {
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
    }, [audioName]);

    return (
        <div className="DataContainer">
            <Switch>
                <Route path="/uist-2021/data/summary">
                    <SummaryView className="SpansView" audioName={props.audioName} audioData={audioData}/>
                </Route>
                <Route path="/uist-2021/data/spans">
                    <SpansView className="SpansView" audioName={props.audioName} audioData={audioData}/>
                </Route>
                <Route path="/uist-2021/data/qa">
                    <QAView className="SpansView" audioName={props.audioName} audioData={audioData}/>
                </Route>
                <Route path="/uist-2021/data/speaker">
                    <SpeakerView className="SpansView" audioName={props.audioName} audioData={audioData}/>
                </Route>
                <Route path="/uist-2021/static/about">
                    <AboutView />
                </Route>
                <Route path="/uist-2021">
                    <p>Home</p>
                </Route>
            </Switch>
        </div>
    )
}

export default DataContainer