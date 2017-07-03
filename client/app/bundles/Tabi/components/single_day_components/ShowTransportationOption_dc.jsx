import React from 'react'

const ShowTransportationOption = (props) => {
	let iconString = "";
	let typeString = props.transportationType;
	switch (props.transportationType) {
	  case "BICYCLING":
	  	typeString = "Bike";
	    iconString = "fa fa-bicycle fa-2x";
	    break;
	  case "WALKING":
	  	typeString = "Walk";
	    iconString = "fa fa-blind fa-2x";
	    break;
	  case "TRANSIT":
	  	typeString = "Public Transit"
	    iconString = "fa fa-train fa-2x";
	    break;
	  case "boat":
	  	typeString = "Boat";
	    iconString = "fa fa-ship fa-2x";
	    break;
	  case "BUS":
	    iconString = "fa fa-bus fa-2x";
	    break;
	  default:
	    iconString = "fa fa-car fa-2x";
	}
	
	console.log("inside ShowTransportationOption");

	const estimatedCost = props.estimatedCost ? `/ ${props.estimatedCost}` : null;

	return (
		<div className="row choice-row">
			<div className="choice-icon">
				<i className={iconString} aria-hidden="true" />
			</div>
			<div className="choice-content">
				<div className="row">
					<b>{props.transportationType}</b>
				</div>
				<div className="row">
					{props.distance} / {props.duration} {estimatedCost}
				</div>
			</div>
			<div className="choice-selected">
				<i className="fa fa-check fa-2x" aria-hidden="true" />
			</div>
		</div>

	);
}

export default ShowTransportationOption;