import React, { useState, useEffect } from 'react'
import { Switch, Route } from "react-router-dom"
import SpansView from "../SpansView/SpansView"
import QAView from "../QAView/QAView"
import SpeakerView from "../SpeakerView/SpeakerView"
import './DataContainer.css'
import AboutView from '../AboutView/AboutView'
import UnifiedView from '../UnifiedView/UnifiedView'
import { NavLink } from 'react-router-dom';

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
                <Route path="/uist-2021/data/main">
                    <UnifiedView outer={props.outer} audioName={props.audioName} audioData={audioData}/>
                </Route>
                <Route path="/uist-2021/data/explore">
                    <SpansView audioName={props.audioName} audioData={audioData}/>
                </Route>
                <Route path="/uist-2021/data/qa">
                    <QAView audioName={props.audioName} audioData={audioData}/>
                </Route>
                <Route path="/uist-2021/data/speaker">
                    <SpeakerView audioName={props.audioName} audioData={audioData}/>
                </Route>
                <Route path="/uist-2021/static/about">
                    <AboutView />
                </Route>
                <Route>
                    <p className="DefaultMessageTitle">Welcome! Navigate to the <b><NavLink to="/uist-2021/data/main">Main Page</NavLink></b> to Begin.</p>
                </Route>
            </Switch>
        </div>
    )
}

export default DataContainer
