import React, { useState, useEffect } from 'react'
import Segment from './Segment'
import "./SpansView.css"

function SpansView(props) {
    const [selectedId, setSelectedId] = useState(null)

    // reset selectedId on audioData change
    let { audioData } = props;
    useEffect(() => setSelectedId(null), [audioData])

    const fuzzyArrayContains = (array, value) => {
        for(let i = 0; i < array.length; i++) {
            // eslint-disable-next-line
            if (array[i] == value) return true
        }
        return false
    }

    if (!props.audioData) {
        return (
            <div>
                <h1>Spans View</h1>
                <p>No audio sample selected</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Spans View</h1>
            <div className="SegmentColumnContainer">
                <div className="SegmentColumn">
                    <div className="ColumnTitleContainer">
                        <h2 className="ColumnTitle">Raw Transcript</h2>
                    </div>
                    {props.audioData?.["raw"]["segments"].map((segment, idx) =>
                        <div key={idx} onClick={() => setSelectedId(segment.id)} className={segment.id === selectedId ? "selected" : ""}>
                            <Segment text={segment.text} id={segment.id}></Segment>
                        </div>
                    )}
                </div>
                <div className="SegmentColumn notclickable">
                    <div className="ColumnTitleContainer">
                        <h2 className="ColumnTitle">Low Pass</h2>
                    </div>
                    {props.audioData?.["low"]["segments"]
                        .filter(e => fuzzyArrayContains(e.id, selectedId))
                        .map((segment, idx) => <div key={idx} className="selected"><Segment text={segment.text} id={segment.id.join(", ")}></Segment></div>)}
                </div>
                <div className="SegmentColumn notclickable">
                    <div className="ColumnTitleContainer">
                        <h2 className="ColumnTitle">Medium Pass</h2>
                    </div>
                    {props.audioData?.["med"]["segments"]
                        .filter(e => fuzzyArrayContains(e.id, selectedId))
                        .map((segment, idx) => <div key={idx} className="selected"><Segment text={segment.text} id={segment.id.join(", ")}></Segment></div>)}
                </div>
                <div className="SegmentColumn notclickable">
                    <div className="ColumnTitleContainer">
                        <h2 className="ColumnTitle">High Pass</h2>
                    </div>
                    {props.audioData?.["high"]["segments"]
                        .filter(e => fuzzyArrayContains(e.id, selectedId))
                        .map((segment, idx) => <div key={idx} className="selected"><Segment text={segment.text} id={segment.id.join(", ")}></Segment></div>)}
                </div>
            </div>
        </div>
    )
}

export default SpansView
