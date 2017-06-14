import React, { Component } from 'react'
import {simpleMarkerStyle, SimpleMarkerIcon} from '../../../utils/marker_helpers/simple_marker_styles.js';


// export default class SimpleMarker extends Component{

const SimpleMarker = (props) => {

	const name = props.name || props.activity;
	const style = simpleMarkerStyle(props);

	return(
		<div style={style}>
		   <SimpleMarkerIcon type={props.type} />
		</div>
	);
}

export default SimpleMarker;