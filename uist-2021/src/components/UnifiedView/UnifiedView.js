import React, { useState, useEffect, useRef } from 'react'
import SimpleSegment from './SimpleSegment'
import AudioSegment from './AudioSegment'
import "./UnifiedView.css"
import classnames from 'classnames'

const ifArrayIntersect = (array1, array2) => {
    const set2 = new Set(array2);
    for(let i = 0; i < array1.length; i++) {
        if (set2.has(array1[i])) return true;
    }
    return false
}

function TitleView(props) {
    return (
        <div className="TitleViewContainer">
            <div className="TitleViewImageContainer">
                <img className="TitleViewImage" src={props.image}></img>
            </div>
            <div className="TitleViewTextContainer">
                <div className="TitleViewTextWrapper">
                    <div className="TitleViewSubtitle">{props.subtitle ? props.subtitle : "Subtitle Not Found"}</div>
                    <div className="TitleViewTitle">{props.title ? props.title : "Title Not Found"}</div>
                    <div className="TitleViewDate">{props.date ? props.date : "Date Not Found"}</div>
                </div>
            </div>
        </div>
    )
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
                ids: element.id,
                info: element.information_contained,
                quality: element.quality
            }
        })

        setRawItems(rawMappedItems)
        setHighItems(highMappedItems)
    }, [raw])

    return (
        <div className="temporal">
            <div className="row">
                <p className="startTimestamp">0:00</p>
                <div className="data high">
                    {highItems.map((element, idx) =>
                        <div key={idx} className={classnames({"selected": ifArrayIntersect(element.ids, props.selectedIds), "item": true})}
                            style={{flex: `${(element.duration * 100).toFixed(2)} 1 auto`}}
                            onClick={() => {props.setSelected(element.ids); props.setHighSelected(idx)}}></div>)}
                </div>
                <p className="endTimestamp">{Math.trunc(props.raw[raw.length - 1].end/60)}:{Math.round(props.raw[raw.length - 1].end%60)}</p>
            </div>
        </div>
    )
}

function getTotalInfo(highSums, rawSums, ids){
    let baseShortInfoTotal = 0;
    highSums.forEach(e => baseShortInfoTotal += e.information_contained);

    let deltaInfo = 0.0;
    ids.forEach(e => {
        deltaInfo = deltaInfo + rawSums[e].info_gain;
    })

    let highTotal = 0.0;
    highSums.forEach(e => {
        highTotal = highTotal + e.information_contained;
    })
    console.log("HIGHTOTAL:" + highTotal);

    let rawTotal = 0.0;
    rawSums.forEach(e => {
        rawTotal = rawTotal + e.info_gain;
    })
    console.log("RAWTOTAL:" + rawTotal);

    let combined = highTotal+rawTotal;
    console.log("HIGHTOTAL+RAWTOTAL: " + combined);

    let totalInfo = baseShortInfoTotal + deltaInfo;
    return (totalInfo * 100).toFixed(2);
}

function onSegmentClick(props, id){
    props.setSelected(id);
    let totalInfo = getTotalInfo(props.segments, props.rawSegments, props.lifetimeSelected);
    props.setInformationShown(totalInfo);
    console.log(totalInfo)
}

function MainSummary(props) {
    // takes in segments prop
    // takes in selectedIds prop
    // takes in setSelected prop
    return (
        <div className="Summary">
            <div className="SummaryTitleContainer">
                <h2 className="SummaryTitle">
                    <span>{props.title} Summary</span>
                </h2>
                <h2 className="InfoDisplayLabel">Information Displayed: <span className="InfoDisplayValue">
                {
                    (props.informationShown === 0) ? 
                    getTotalInfo(props.segments, props.rawSegments, props.lifetimeSelected)
                    :
                    props.informationShown
                } %
                </span></h2>
            </div>
            <div className="MainDataSegments">
                { props.segments
                    .map((segment, idx) =>
                        <span key={idx} 
                        onClick={() => {onSegmentClick(props, segment.id)}} 
                        className={classnames({'selected': ifArrayIntersect(segment.id, props.selectedIds), "item": true})}
                        ref={ifArrayIntersect(segment.id, props.selectedIds) ? props.selectedRef : null}>
                        <SimpleSegment 
                            text={segment.text} 
                            id={segment.id.join(", ")}
                            sequence={segment.sequence}
                            phrase={segment.phrase ? segment.phrase : null}
                            isSelected={ifArrayIntersect(segment.id, props.selectedIds)}
                            speaker={segment.duration}/>
                        </span>
                    ) }
            </div>
        </div>
    );
}

function getStartTime(array){
    if (array[0] != null) {
        return array[0].start;
    }
}

function getEndTime(array){
    if (array[0] != null) {
        return array[array.length - 1].end;
    }
}

function DetailSummary(props) {
    return (
        <div className={`DetailModal notclickable ${props.title}`}>
            <div className="ColumnHeader">
                <div className="ColumnTitleContainer">
                    <h2 className="ColumnTitle">{props.title} {props.title !== "Original" ? "Summary" : "Transcript"}</h2>
                </div>
                {
                        props.segments
                        .filter(segment => ifArrayIntersect(segment.id, props.selectedIds)) != null &&
                        props.audioName &&
                        <AudioSegment 
                        audioName={props.audioName}
                        start={getStartTime(props.segments
                            .filter(segment => ifArrayIntersect(segment.id, props.selectedIds)))}
                        end={getEndTime(props.segments
                            .filter(segment => ifArrayIntersect(segment.id, props.selectedIds)))}/>
                }
            </div>
            <div className="DetailDataSegments">
                { 
                    props.segments
                        .filter(segment => ifArrayIntersect(segment.id, props.selectedIds))
                        .map((segment, idx) =>
                            <span key={idx} className={classnames({'selected': true, "item": true})}>
                                <SimpleSegment 
                                    text={segment.text} id={segment.id.join(", ")}
                                    speaker={segment.speaker ? segment.speaker : null}
                                    phrase={segment.phrase ? segment.phrase : null}
                                    isSelected={ifArrayIntersect(segment.id, props.selectedIds)}
                                    label="Speaker"/>
                            </span>
                        ) 
                }
            </div>
        </div>
    );
}

function UnifiedView(props) {
    const [selectedIds, setSelectedIds] = useState([])
    const [highSelectedIdx, setHighSelectedIdx] = useState(null)
    const [lifetimeSelectedIdx, setLifetimeSelectedIdx] = useState([])
    const [informationShown, setInformationShown] = useState(0)
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

        let tempLifeTimeSelected = lifetimeSelectedIdx;
        if (selectedIds != null) {
            selectedIds.forEach(e => {
                if (!tempLifeTimeSelected.includes(e)){
                    tempLifeTimeSelected.push(e);
                }
            })
        }

        setLifetimeSelectedIdx(tempLifeTimeSelected);
    }

    return (
        <div className="Wrapper">
            <div className="DataParent">
                <div className="SummaryView">
                    <MainSummary title="" rawSegments={props.audioData["raw"]["segments"]} segments={props.audioData["high"]["segments"]} selectedIds={selectedIds} setSelected={setSelected} selectedRef={selectedRef} lifetimeSelected={lifetimeSelectedIdx} informationShown={informationShown} setInformationShown={setInformationShown}/>
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
            <TitleView title={props.audioData.title} subtitle={props.audioData.subtitle} date={props.audioData.date} audioName={props.audioName} image={props.audioData.image}></TitleView>
        </div>
    )
}

export default UnifiedView