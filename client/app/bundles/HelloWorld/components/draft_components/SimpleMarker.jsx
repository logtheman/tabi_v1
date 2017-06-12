import React, { Component } from 'react'
import {simpleMarkerStyle, SimpleMarkerIcon} from '../../../utils/marker_helpers/simple_marker_styles.js';


export default class SimpleMarker extends Component{

	render(){
		const name = this.props.name || this.props.activity;
		const style = simpleMarkerStyle(this.props);

		return(
			<div style={style}>
			   <SimpleMarkerIcon type={this.props.type} />
			</div>
		);
	}
}