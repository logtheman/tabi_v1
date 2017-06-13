import React from 'react'
import SimpleMap from './SimpleMap'


export default class MapContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			markers: [{
				position: {
					lat: 35.6586,
					lng: 139.7454
				}
			}]
		}

	}


	render(){
		return(
			<div style={{height: "60%", marginTop: '10px', marginRight: '10px', marginLeft: '10px', border: '1px solid black', minHeight: '500px'}}>
				<SimpleMap 
				locations={this.props.locations} 
				activeLocation={this.props.activeLocation}
				/>
			</div>
		);
	}

}