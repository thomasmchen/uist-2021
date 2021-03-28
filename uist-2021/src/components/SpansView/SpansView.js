import React, {Component} from 'react'
import Segment from './Segment'
import "./SpansView.css"

class SpansView extends Component {
    state = {
        raw: [],
        low: [],
        mid: [],
        high: [],
        selectedId: null
    }

    updateOtherSegments = (clickedId) => {
		const data = this.props.audioData;
        console.log(data);
		this.setState({
			selectedId: clickedId,
			high: data["high"].filter(e => e.id === this.state.selectedId),
			mid: data["mid"].filter(e => e.id === this.state.selectedId),
			low: data["low"].filter(e => e.id === this.state.selectedId),
		})
	};

    render() {
        return (
            <div>
                <h1>Spans View</h1>
                <div className="SegmentColumnContainer">
                    <div className="SegmentColumn">
                        <div className="ColumnTitleContainer">
                            <h2 className="ColumnTitle">Raw Transcript</h2>
                        </div>
                        {this.props.audioData === null ? <div className="EmptyColumn"><p className="EmptyColumnText">No Data</p></div> : (this.props.audioData.raw.segments).map( (segment) => {
                            return(
                                <Segment key={segment.id} text={segment.text} id={segment.id} onClick={this.updateOtherSegments}></Segment>
                            )
                        })}
                    </div>
                    <div className="SegmentColumn">
                        <div className="ColumnTitleContainer">
                            <h2 className="ColumnTitle">Low Pass</h2>
                        </div>
                        {this.state.low === null ? <div className="EmptyColumn"><p className="EmptyColumnText">No Data</p></div> : this.state.low.map( (segment) => {
                            return(
                                <Segment key={segment.id} text={segment.text} id={segment.id}></Segment>
                            )
                        })}
                    </div>
                    <div className="SegmentColumn">
                        <div className="ColumnTitleContainer">
                            <h2 className="ColumnTitle">Medium Pass</h2>
                        </div>
                        {this.state.med === null ? <div className="EmptyColumn"><p className="EmptyColumnText">No Data</p></div> : this.state.med.map( (segment) => {
                            return(
                                <Segment key={segment.id} text={segment.text} id={segment.id.Join(", ")}></Segment>
                            )
                        })}
                    </div>
                    <div className="SegmentColumn">
                        <div className="ColumnTitleContainer">
                            <h2 className="ColumnTitle">High Pass</h2>
                        </div>
                        {this.state.high === null ? <div className="EmptyColumn"><p className="EmptyColumnText">No Data</p></div> : this.state.high.map( (segment) => {
                            return(
                                <Segment key={segment.id} text={segment.text} id={segment.id.Join(", ")}></Segment>
                            )
                        })}
                    </div>              
                </div>
            </div>
        )
    }
}
export default SpansView