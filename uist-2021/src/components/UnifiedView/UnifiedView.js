import React, { useState, useEffect, useRef } from 'react'
import SimpleSegment from './SimpleSegment'
import AudioSegment from './AudioSegment'
import DataSegment from './DataSegment'
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
                            onClick={() => {onTemporalSegmentclick(props, element.ids, idx)}}></div>)}
                </div>
                <p className="endTimestamp">{Math.trunc(props.raw[raw.length - 1].end/60)}:{Math.round(props.raw[raw.length - 1].end%60)}</p>
            </div>
        </div>
    )
}

function getTotalInfo(highSums, ids){
    let baseShortInfoTotal = 0;
    highSums.forEach(e => baseShortInfoTotal += e.information_contained);

    let deltaInfo = 0.0;
    if (ids != null) {
        ids.forEach(e => {
            deltaInfo = deltaInfo + highSums[e].delta;
        })
    }

    let totalInfo = baseShortInfoTotal + deltaInfo;
    return (totalInfo * 100).toFixed(0);
}

function onTemporalSegmentclick(props, ids, idx){
    props.setSelected(ids);
    props.setHighSelected(idx);
    if (idx != null) {
        let tempLifeTimeSelected = props.lifetimeSelectedIds;
        if (!props.lifetimeSelectedIds.includes(idx)){
                tempLifeTimeSelected.push(idx);
                props.setLifetimeSelectedIds(tempLifeTimeSelected);
        }
    }
}

function onSegmentClick(props, id, idx){
    props.setSelected(id);

    if (idx != null) {
        let tempLifeTimeSelected = props.lifetimeSelectedIds;
        if (!props.lifetimeSelectedIds.includes(idx)){
                tempLifeTimeSelected.push(idx);
                props.setLifetimeSelectedIds(tempLifeTimeSelected);
        }
    }
}

function MainSummary(props) {
  // takes in segments prop
  // takes in selectedIds prop
  // takes in setSelected prop
  const totalDisplayed = getTotalInfo(props.segments, props.lifetimeSelectedIds)
  const alternatingColors = ["#2E2E2E", "#3D3D3D"] // add more if you want
  let colors = []
  let br = 0
  for (let i = 0; i < props.segments.length; i++) {
    colors.push(alternatingColors[br % alternatingColors.length])
    if (props.segments[i].ShouldBreak) { br++ }
  }
  // extra for end
  colors.push(alternatingColors[(br + 1) % alternatingColors.length])
  return (
    <div className="Summary">
      <div className="SummaryTitleContainer">
        <h2 className="SummaryTitle">
          <span>{props.title} Summary</span>
        </h2>
        <h2 className="InfoDisplayLabel">Total Information Displayed:  <span className="InfoDisplayValue" style={{fontFamily: "monospace"}}>
        {totalDisplayed} %
        </span></h2>
      </div>
      <div className="MainDataSegments">
        { props.segments
          .map((segment, idx) =>
            <div style={{
              backgroundColor: colors[idx],
              width: "100%",
              fontSize: 20,
            }}>
              <span key={idx} 
              onClick={() => {onSegmentClick(props, segment.id, idx)}} 
              onMouseEnter={() => {onSegmentClick(props, segment.id, idx)}} 
              className={classnames({'selected': ifArrayIntersect(segment.id, props.selectedIds), "item": true})}
              ref={ifArrayIntersect(segment.id, props.selectedIds) ? props.selectedRef : null}>
              <SimpleSegment 
                text={segment.text} 
                id={segment.id.join(", ")}
                sequence={segment.sequence}
                phrase={segment.phrase ? segment.phrase : null}
                isSelected={ifArrayIntersect(segment.id, props.selectedIds)}
                speaker={segment.duration}/>
              {segment.ShouldBreak && (<div>
                <div style={{height: 12, backgroundColor: colors[idx]}}/>
                <div style={{backgroundColor: "#616161", height: 1, width: "100%"}}/>
                <div style={{height: 12, backgroundColor: colors[idx + 1]}}/>
                </div>)}
              </span>
            </div>
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
  const [expanded, setExpanded] = React.useState(undefined)

  const expand = (innerProps) => {
    setExpanded(innerProps)
  }
  const expandSelected = () => {
    for (const segment of props.initialSegments) {
      if (ifArrayIntersect(segment.id, props.selectedIds)) {
        expand({...segment,
          raw: props.segments,
          id: segment.id.join(", "),
          phrase: segment.phrase || null,
          isSelected: true,
        })
        break;
      }
    }
  }

  let full = (<div/>)
  if (expanded && props.selectedIds) {
    const ids = expanded.id.split(", ").map(s => parseInt(s))
    const raws = expanded.raw.filter((_, idx) => ids.includes(idx)).map(r => r.text)
    for (const selected of ids) {
      if (props.selectedIds.includes(selected)) {
        full = (<div>
          <br/>
          <br/>
          <div style={{fontSize: 20}}>
            <SimpleSegment
                phrase={expanded.phrase}
                text={raws.join("\n\n")}
                speaker={null}
                isSelected={true}
                label="Full"/>
          </div>
          </div>)
          break;
      }
    }
  }

    return (
        <div className={`DetailModal notclickable ${props.title}`}>
            <div className="ColumnHeader" style={{flex: 1}}>
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
            {
                (props.selectedIds == null) &&
                <div>
                    <p className="DefaultMessage">
                        Click a sentence in the Summary to view Initial Summary and Original Audio.
                    </p>
                </div>
            }
            <div className="DetailDataSegments">
                { 
                props.initialSegments != null ? 
                    props.initialSegments
                            .filter(segment => ifArrayIntersect(segment.id, props.selectedIds))
                            .map((segment, idx) =>
                                <span key={idx} className={classnames({'selected': true, "item": true})}>
                                    <SimpleSegment 
                                        raw={props.segments}
                                        text={segment.text} id={segment.id.join(", ")}
                                        speaker={segment.speaker ? segment.speaker : null}
                                        phrase={segment.phrase ? segment.phrase : null}
                                        isSelected={ifArrayIntersect(segment.id, props.selectedIds)}
                                        label="Speaker"/>
                                </span>
                            ) 
                : 
                    props.segments
                        .filter(segment => ifArrayIntersect(segment.id, props.selectedIds))
                        .map((segment, idx) =>
                            <span key={idx} className={classnames({'selected': true, "item": true})}>
                                <SimpleSegment 
                                    raw={props.segments}
                                    text={segment.text} id={segment.id.join(", ")}
                                    speaker={segment.speaker ? segment.speaker : null}
                                    phrase={segment.phrase ? segment.phrase : null}
                                    isSelected={ifArrayIntersect(segment.id, props.selectedIds)}
                                    label="Speaker"/>
                            </span>
                        ) 
                }
            </div>
            <div className="DetailDataSegments">
             <h2 className="ColumnTitle" style={{textTransform: "uppercase", color: "#8B8B8B", fontSize: "17px", letterSpacing: "0.5px", fontWeight: "normal"}}>
               <span>Original Transcript</span>
               <span onClick={expandSelected}> +</span>
              </h2>
             {full}
            </div>
        </div>
    );
}

function getTotalDelta(props){
    let deltaInfo = 0.0;
    let selectedSegements = props.segments.filter(segment => ifArrayIntersect(segment.id, props.selectedIds));
    selectedSegements.forEach(e => deltaInfo = deltaInfo + e.delta);
    console.log(deltaInfo)
    return (deltaInfo*100).toFixed(2);
}

function DetailDataSummary(props) {
    return (
        <div className={`DetailDataModal notclickable ${props.title}`}>
            <div className="ColumnTitleContainer" style={{flex: 1}}>
                <h2 className="ColumnTitle">
                    {props.title}
                    {getTotalDelta(props) != 0 &&
                    <span> | <span className="AdditionalInfoLabel">+{getTotalDelta(props)}% Info</span></span>}
                </h2>
            </div>
            {
                (props.selectedIds == null) &&
                <p className="DefaultMessage">
                    Click a sentence in the Summary to view in-depth Summary Data.
                </p>
            }
            <div className="DetailDataDataSegments" style={{flex: 1}}>
                { 
                    props.segments
                        .filter(segment => ifArrayIntersect(segment.id, props.selectedIds))
                        .map((segment, idx) =>
                            <span key={idx} className={classnames({'selected': true, "item": true})}>
                                <DataSegment
                                    segment={segment}
                                    totalInfo={getTotalInfo(props.segments, props.lifetimeSelectedIds)}
                                />
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
    const [lifetimeSelectedIds, setLifetimeSelectedIds] = useState([])
    const [informationShown, setInformationShown] = useState(0)
    const selectedRef = useRef(null);
    const detailRef = useRef(null);

    // reset selectedId on audioData change
    let { audioData } = props;
    useEffect(() => setSelectedIds(null), [audioData])
    useEffect(() => setLifetimeSelectedIds([]), [audioData])

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
            <div className="DefaultMessageContainer">
                <p className="DefaultMessageTitle">Welcome to the Main View!<br></br><span className="DefaultMessage">Please select an audio above to continue</span></p>
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

        // Would store all exposed asr segment ids for the lifetime of the session
        /*
        let tempLifeTimeSelected = lifetimeSelectedIdx;
        if (selectedIds != null) {
            selectedIds.forEach(e => {
                if (!tempLifeTimeSelected.includes(e)){
                    tempLifeTimeSelected.push(e);
                }
            })
        }

        setLifetimeSelectedIdx(tempLifeTimeSelected);
        */
    }

    return (
        <div className="Wrapper">
            <TitleView title={props.audioData.title} subtitle={props.audioData.subtitle} date={props.audioData.date} audioName={props.audioName} image={props.audioData.image}></TitleView>
            <div className="DataParent">
                <div className="SummaryView">
                    <MainSummary title="" rawSegments={props.audioData["raw"]["segments"]} segments={props.audioData["high"]["segments"]} selectedIds={selectedIds} setSelected={setSelected} selectedRef={selectedRef} lifetimeSelectedIds={lifetimeSelectedIds} setLifetimeSelectedIds={setLifetimeSelectedIds} informationShown={informationShown} setInformationShown={setInformationShown}/>
                    <TemporalView
                            raw={props.audioData["raw"]["segments"]}
                            high={props.audioData["high"]["segments"]}
                            med={props.audioData["med"]["segments"]}
                            low={props.audioData["low"]["segments"]}
                            selectedIds={selectedIds} setSelected={setSelectedIds} setHighSelected={setHighSelectedIdx} lifetimeSelectedIds={lifetimeSelectedIds} setLifetimeSelectedIds={setLifetimeSelectedIds}/>
                </div>
                <div className="DetailView" style={{flex: 1}} ref={detailRef}>
                    <div style={{flex: 0.5}}>
                    <DetailDataSummary title="Summary Data" segments={props.audioData["high"]["segments"]}  lifetimeSelectedIds={lifetimeSelectedIds} selectedIds={selectedIds} label="speaker"/>
                    </div>
                    {
                        /*
                            <DetailSummary title="Intermediate" segments={props.audioData["med"]["segments"]} selectedIds={selectedIds} label="speaker"/>
                            <DetailSummary title="Initial" segments={props.audioData["low"]["segments"]} selectedIds={selectedIds} label="speaker"/>
                            <DetailSummary title="Original" segments={props.audioData["raw"]["segments"]} selectedIds={selectedIds} audioName={props.audioName} label="speaker"/>
                        */
                    }
                    <div style={{flex: 3}}>
                    <DetailSummary title="Initial" initialSegments={props.audioData["low"]["segments"]} segments={props.audioData["raw"]["segments"]} selectedIds={selectedIds} audioName={props.audioName} label="speaker"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnifiedView
