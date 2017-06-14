import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import SimpleMarker from '../components/single_day_components/SimpleMarker_dc';



export default class SimpleMap extends Component {
	constructor(props){
		super(props);
		this.state = {
			center: {
				lat: 26.2144722,
				lng: 127.6763,
			},
			zoom: 10,
		}

	}

  render() {
  	let center = {
  		lat: 26.2144722,
  		lng: 127.6763,
  	}
  	const Markers = this.props.locations &&
  	  this.props.locations.map((marker, index) => {
  	  	if(index === this.props.activeLocation){
  	  		center.lat = marker.lat;
  	  		center.lng = marker.lng;
  	  	}

  	    return (
  	    	<SimpleMarker
	  	      // required props
	  	      key={index}
	  	      lat={marker.lat}
	  	      lng={marker.lng}
	  	      // any user props
	  	      name={marker.name}
	  	      activity={marker.activity}
	  	      type={marker.type}
  	       />
  	    );   
  	  }
  	);


    return (
      <GoogleMapReact
        center={center}
        defaultZoom={this.state.zoom}
      >
      	{Markers}
      </GoogleMapReact>
    );
  }
}


// import React, {PropTypes, Component} from 'react/addons';
// import controllable from 'react-controllables';
// import shouldPureComponentUpdate from 'react-pure-render/function';

// import GoogleMap from 'google-map-react';
// import MarkerExample, {K_SCALE_NORMAL} from './marker_example.jsx';

// import {getScale, getRealFromTo} from '../helpers/calc_markers_visibility.js';
// import markerDescriptions from '../constants/marker_descriptions.js';
// import {customDistanceToMouse} from '../helpers/custom_distance.js';

// import {List} from 'immutable';

// const K_MARGIN_TOP = 30;
// const K_MARGIN_RIGHT = 30;
// const K_MARGIN_BOTTOM = 30;
// const K_MARGIN_LEFT = 30;

// const K_HOVER_DISTANCE = 30;

// @controllable(['center', 'zoom', 'markers'])
// export default class MainMapBlock extends Component {

//   static defaultProps = {
//     center: new List([59.744465, 30.042834]),
//     zoom: 10,
//     visibleRowFirst: -1,
//     visibleRowLast: -1,
//     hoveredRowIndex: -1
//   }

//   shouldComponentUpdate = shouldPureComponentUpdate;

//   constructor(props) {
//     super(props);
//   }

//   _onBoundsChange = (center, zoom, bounds, marginBounds) => {
//     if (this.props.onBoundsChange) {
//       this.props.onBoundsChange({center, zoom, bounds, marginBounds});
//     } else {
//       this.props.onCenterChange(center);
//       this.props.onZoomChange(zoom);
//     }
//   }

//   _onChildClick = (key, childProps) => {
//     const markerId = childProps.marker.get('id');
//     const index = this.props.markers.findIndex(m => m.get('id') === markerId);
//     if (this.props.onChildClick) {
//       this.props.onChildClick(index);
//     }
//   }

//   _onChildMouseEnter = (key, childProps) => {
//     const markerId = childProps.marker.get('id');
//     const index = this.props.markers.findIndex(m => m.get('id') === markerId);
//     if (this.props.onMarkerHover) {
//       this.props.onMarkerHover(index);
//     }
//   }

//   _onChildMouseLeave = (/* key, childProps */) => {
//     if (this.props.onMarkerHover) {
//       this.props.onMarkerHover(-1);
//     }
//   }

//   _onBalloonCloseClick = () => {
//     if (this.props.onChildClick) {
//       this.props.onChildClick(-1);
//     }
//   }

//   _distanceToMouse = customDistanceToMouse;

//   render() {
//     const {rowFrom, rowTo} = getRealFromTo(this.props.visibleRowFirst, this.props.visibleRowLast, this.props.maxVisibleRows, this.props.markers.size);

//     const Markers = this.props.markers &&
//       this.props.markers.filter((m, index) => index >= rowFrom && index <= rowTo)
//       .map((marker, index) => (
//         <MarkerExample
//           // required props
//           key={marker.get('id')}
//           lat={marker.get('lat')}
//           lng={marker.get('lng')}
//           // any user props
//           showBallon={index + rowFrom === this.props.openBallonIndex}
//           onCloseClick={this._onBalloonCloseClick}
//           hoveredAtTable={index + rowFrom === this.props.hoveredRowIndex}
//           scale={getScale(index + rowFrom, this.props.visibleRowFirst, this.props.visibleRowLast, K_SCALE_NORMAL)}
//           {...markerDescriptions[marker.get('type')]}
//           marker={marker} />
//       ));

//     return (
//       <GoogleMap
//         // apiKey={null}
//         center={this.props.center.toJS()}
//         zoom={this.props.zoom}
//         onBoundsChange={this._onBoundsChange}
//         onChildClick={this._onChildClick}
//         onChildMouseEnter={this._onChildMouseEnter}
//         onChildMouseLeave={this._onChildMouseLeave}
//         margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
//         hoverDistance={K_HOVER_DISTANCE}
//         distanceToMouse={this._distanceToMouse}
//         >
//         {Markers}
//       </GoogleMap>
//     );
//   }
// }