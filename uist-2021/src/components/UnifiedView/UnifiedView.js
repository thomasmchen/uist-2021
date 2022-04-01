import React, { useState, useEffect, useRef } from 'react'
import SimpleSegment from './SimpleSegment'
import "./UnifiedView.css"
import classnames from 'classnames'

const ifArrayIntersect = (array1, array2) => {
    const set2 = new Set(array2);
    for(let i = 0; i < array1.length; i++) {
        if (set2.has(array1[i])) return true;
    }
    return false
}


function TemporalView(props) {
    const [rawItems, setRawItems] = useState([])
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

        const highMappedItems = props.high.map(element => {
            return {
                name: element.id.join(", "),
                duration: element.id.reduce((p, c) => p + rawDurationMap[c], 0), // cumulative duration of all associated segments
                ids: element.id
            }
        })

        setRawItems(rawMappedItems)
        setHighItems(highMappedItems)
    }, [raw])

    return (
        <div className="temporal">
            <div className="row">
                <p className="label">0:00</p>
                <div className="data high">
                    {highItems.map((element, idx) =>
                        <div key={idx} className={classnames({"selected": ifArrayIntersect(element.ids, props.selectedIds), "item": true})}
                            style={{flex: `${(element.duration * 100).toFixed(2)} 1 auto`}}
                            onClick={() => {props.setSelected(element.ids); props.setHighSelected(idx)}}></div>)}
                </div>
            </div>
        </div>
    )
}

function MainSummary(props) {
    // takes in segments prop
    // takes in selectedIds prop
    // takes in setSelected prop
    return (
        <div className="Summary">
            <div className="SummaryTitleContainer">
                <h2 className="SummaryTitle">{props.title} Summary</h2>
            </div>
            <div className="data">
                { props.segments
                    .map((segment, idx) =>
                        <div key={idx} 
                            onClick={() => {props.setSelected(segment.id)}} 
                            className={classnames({'selected': ifArrayIntersect(segment.id, props.selectedIds), "item": true})}
                            ref={ifArrayIntersect(segment.id, props.selectedIds) ? props.selectedRef : null}>
                            <SimpleSegment 
                                text={segment.text} 
                                id={segment.id.join(", ")}
                                sequence={segment.sequence}
                                phrase={segment.phrase ? segment.phrase : null}
                                isSelected={ifArrayIntersect(segment.id, props.selectedIds)}
                                speaker={segment.duration}/>
                        </div>
                    ) }
            </div>
        </div>
    );
}

function DetailSummary(props) {
    return (
        <div className={`DetailModal notclickable ${props.title}`}>
            <div className="ColumnTitleContainer">
                <h2 className="ColumnTitle">{props.title} {props.title !== "Original" ? "Summary" : "Transcript"}</h2>
            </div>
            <div className="data">
                { props.segments
                        .filter(segment => ifArrayIntersect(segment.id, props.selectedIds))
                        .map((segment, idx) =>
                            <div key={idx} className={classnames({'selected': true, "item": true})}>
                                <SimpleSegment 
                                    text={segment.text} id={segment.id.join(", ")}
                                    speaker={segment.speaker ? segment.speaker : null}
                                    phrase={segment.phrase ? segment.phrase : null}
                                    isSelected={ifArrayIntersect(segment.id, props.selectedIds)}
                                    label="Speaker"/>
                            </div>
                        ) }
            </div>
        </div>
    );
}

function UnifiedView(props) {
    const [selectedIds, setSelectedIds] = useState([])
    const [highSelectedIdx, setHighSelectedIdx] = useState(null)
    const selectedRef = useRef(null);
    const detailRef = useRef(null);

    // reset selectedId on audioData change
    let { audioData } = props;
    useEffect(() => setSelectedIds(null), [audioData])

    // scroll to high segment if out of view when a qualifying segment is chosen
    useEffect(() => {
        if (highSelectedIdx === null){
            return;
        } 

        if (selectedRef.current){
            selectedRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
        }

    }, [selectedRef, highSelectedIdx]);


    if (!props.audioData) {
        return (
            <div>
                <h1>Unified View</h1>
                <p>No audio sample selected</p>
            </div>
        )
    }
    const right = document.querySelector(".DetailView");

    // Scrolls the detail view up when the sentence ref is clicked
    const setSelected = (ids) => {
        setSelectedIds(ids);

        detailRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    }

    return (
        <div className="Parent">
            <div className="SummaryView">
                <MainSummary title="" segments={props.audioData["high"]["segments"]} selectedIds={selectedIds} setSelected={setSelected} selectedRef={selectedRef}/>
                <TemporalView
                        raw={props.audioData["raw"]["segments"]}
                        high={props.audioData["high"]["segments"]}
                        med={props.audioData["med"]["segments"]}
                        low={props.audioData["low"]["segments"]}
                        selectedIds={selectedIds} setSelected={setSelectedIds} setHighSelected={setHighSelectedIdx} />
            </div>
            <div className="DetailView" ref={detailRef}>
                <DetailSummary title="Intermediate" segments={props.audioData["med"]["segments"]} selectedIds={selectedIds} label="speaker"/>
                <DetailSummary title="Initial" segments={props.audioData["low"]["segments"]} selectedIds={selectedIds} label="speaker"/>
                <DetailSummary title="Original" segments={props.audioData["raw"]["segments"]} selectedIds={selectedIds} audioName={props.audioName} label="speaker"/>
            </div>
        </div>
    )
}

export default UnifiedView