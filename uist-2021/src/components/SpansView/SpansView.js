import React, { Component } from 'react';
import AudioTextData from "./AudioTextData"

class SpansView extends Component {
    render () {
        return (
            <div>
                <h1>Spans View</h1>
                <AudioTextData className="AudioTextData" audioName={this.props.audioName} audioData={this.props.audioData}/>
            </div>
        )
    }

    /*
    state = {
		raw: [], <-- either load this in from props or load from the JSON 
		highlightedRawId: null,
		high: [], <-- data for rendering high 
		mid: [], <-- data for rendering mid 
		low: [], <-- data for rendering low 
	}

	const updateOtherSegments = (selectedId) => {
		const data = ... load data for selectedId
		this.setState({
			highlightedRawId: selectedId,
			high: data["high"].filter(e => e.id === selectedId),
			mid: data["mid"].filter(e => e.id === selectedId),
			low: data["low"].filter(e => e.id === selectedId),
		})
	}

	render(
		<Columns>
			<Raw segments={this.state.raw} onSelectSegment={updateOtherSegments} />
			<High segments={this.state.high} />
			<Mid segments={this.state.mid} />
			<Low segments={this.state.low} />
		</Columns>
	)
    */
}
export default SpansView