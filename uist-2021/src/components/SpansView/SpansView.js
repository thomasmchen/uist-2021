import React, { useState, useEffect } from 'react'
import Segment from './Segment'
import "./SpansView.css"
import classnames from 'classnames';

const ifArrayIntersect = (array1, array2) => {
    const set2 = new Set(array2);
    for(let i = 0; i < array1.length; i++) {
        if (set2.has(array1[i])) return true;
    }
    return false
}

function TemporalView(props) {
    const [rawItems, setRawItems] = useState([])
    const [lowItems, setLowItems] = useState([])
    const [medItems, setMedItems] = useState([])
    const [highItems, setHighItems] = useState([])

    // only run when `raw` changes
    let { raw } = props;
    useEffect(() => {
        if (!props.raw) return;

        // convert all start-end to % duration
        const absoluteStart = props.raw[0].start
        const absoluteEnd = props.raw[props.raw.length - 1].end
        const duration = absoluteEnd - absoluteStart
        const rawMappedItems = props.raw.map(element => {
            return {
                name: element.id[0],
                duration: (element.end - element.start) / duration,
                ids: element.id
            }
        })
        let rawDurationMap = {}
        rawMappedItems.forEach(e => rawDurationMap[e.name] = e.duration)

        // convert all other items to width= sum(associated segments duration)
        const lowMappedItems = props.low.map(element => {
            return {
                name: element.id.join(", "),
                duration: element.id.reduce((p, c) => p + rawDurationMap[c], 0), // cumulative duration of all associated segments
                ids: element.id
            }
        })

        const medMappedItems = props.med.map(element => {
            return {
                name: element.id.join(", "),
                duration: element.id.reduce((p, c) => p + rawDurationMap[c], 0), // cumulative duration of all associated segments
                ids: element.id
            }
        })

        const highMappedItems = props.high.map(element => {
            return {
                name: element.id.join(", "),
                duration: element.id.reduce((p, c) => p + rawDurationMap[c], 0), // cumulative duration of all associated segments
                ids: element.id
            }
        })

        setRawItems(rawMappedItems)
        setLowItems(lowMappedItems)
        setMedItems(medMappedItems)
        setHighItems(highMappedItems)
    }, [raw])

    return (
        <div className="temporal">
            <div className="row">
                <p className="label">Raw</p>
                <div className="data raw">
                    {rawItems.map((element, idx) =>
                        <div key={idx} className={classnames({"selected": ifArrayIntersect(element.ids, props.selectedIds), "item": true})}
                            style={{flex: `${(element.duration * 100).toFixed(2)} 1 auto`}}
                            onClick={() => props.setSelected(element.ids)}></div>)}
                </div>
            </div>
            <div className="row">
                <p className="label">Low</p>
                <div className="data low">
                    {lowItems.map((element, idx) =>
                        <div key={idx} className={classnames({"selected": ifArrayIntersect(element.ids, props.selectedIds), "item": true})}
                            style={{flex: `${(element.duration * 100).toFixed(2)} 1 auto`}}
                            onClick={() => props.setSelected(element.ids)}></div>)}
                </div>
            </div>
            <div className="row">
                <p className="label">Med</p>
                <div className="data med">
                    {medItems.map((element, idx) =>
                        <div key={idx} className={classnames({"selected": ifArrayIntersect(element.ids, props.selectedIds), "item": true})}
                            style={{flex: `${(element.duration * 100).toFixed(2)} 1 auto`}}
                            onClick={() => props.setSelected(element.ids)}></div>)}
                </div>
            </div>
            <div className="row">
                <p className="label">High</p>
                <div className="data high">
                    {highItems.map((element, idx) =>
                        <div key={idx} className={classnames({"selected": ifArrayIntersect(element.ids, props.selectedIds), "item": true})}
                            style={{flex: `${(element.duration * 100).toFixed(2)} 1 auto`}}
                            onClick={() => props.setSelected(element.ids)}></div>)}
                </div>
            </div>
        </div>
    )
}

function HighCol(props) {
    // takes in segments prop
    // takes in selectedIds prop
    // takes in setSelected prop
    return (
        <div className="SegmentColumn High">
            <div className="data">
                { props.segments
                    .map((segment, idx) =>
                        <div key={idx} onClick={() => props.setSelected(segment.id)} className={classnames({'selected': ifArrayIntersect(segment.id, props.selectedIds), "item": true})}>
                            <Segment text={segment.text} id={segment.id.join(", ")}></Segment>
                        </div>
                    ) }
            </div>
        </div>
    );
}

function GenericCol(props) {
    // takes in title prop
    // takes in segments prop
    // takes in selectedIds prop
    return (
        <div className={`SegmentColumn notclickable ${props.title}`}>
            <div className="ColumnTitleContainer">
                <h2 className="ColumnTitle">{props.title} Pass</h2>
            </div>
            <div className="data">
                { props.segments
                        .filter(segment => ifArrayIntersect(segment.id, props.selectedIds))
                        .map((segment, idx) =>
                            <div key={idx} className={classnames({'selected': true, "item": true})}>
                                <Segment text={segment.text} id={segment.id.join(", ")} speaker={segment.speaker ? segment.speaker : null}></Segment>
                            </div>
                        ) }
            </div>
        </div>
    );
}

function SpansView(props) {
    const [selectedIds, setSelectedIds] = useState([])

    // reset selectedId on audioData change
    let { audioData } = props;
    useEffect(() => setSelectedIds(null), [audioData])

    if (!props.audioData) {
        return (
            <div>
                <h1>Explore View</h1>
                <p>No audio sample selected</p>
            </div>
        )
    }

    return (
        <div className="Parent">
            <div className="HighSegmentViewColumn">
                <HighCol segments={props.audioData["high"]["segments"]} selectedIds={selectedIds} setSelected={setSelectedIds} />
            </div>
            <div className="DataViewColumn">
                <div>
                    <TemporalView
                        raw={props.audioData["raw"]["segments"]}
                        high={props.audioData["high"]["segments"]}
                        med={props.audioData["med"]["segments"]}
                        low={props.audioData["low"]["segments"]}
                        selectedIds={selectedIds} setSelected={setSelectedIds} />
                </div>
                <div className="SegmentColumnContainer">
                    <GenericCol title="Medium" segments={props.audioData["med"]["segments"]} selectedIds={selectedIds} />
                    <GenericCol title="Low" segments={props.audioData["low"]["segments"]} selectedIds={selectedIds} />
                    <GenericCol title="Raw" segments={props.audioData["raw"]["segments"]} selectedIds={selectedIds} />
                </div>
            </div>
        </div>
    )
}

export default SpansView
