import React from 'react'

const ShowTransportationOption = (props) => {
	let iconString = "";
	let typeString = props.transportationType;
	switch (props.transportationType) {
	  case "BICYCLING":
	  	typeString = "bike";
	    iconString = "fa fa-bicycle fa-2x";
	    break;
	  case "WALKING":
	  	typeString = "walk";
	    iconString = "fa fa-blind fa-2x";
	    break;
	  case "TRANSIT":
	  	typeString = "public transit"
	    iconString = "fa fa-train fa-2x";
	    break;
	  case "boat":
	  	typeString = "boat";
	    iconString = "fa fa-ship fa-2x";
	    break;
	  case "BUS":
	  	typeString = "bus";
	    iconString = "fa fa-bus fa-2x";
	    break;
	  default:
	  	typeString = "drive";
	    iconString = "fa fa-car fa-2x";
	}
	console.log("selectedType:", props.selectedType, "typeString:", typeString);
	const estimatedCost = props.estimatedCost ? `/ ${props.estimatedCost}` : null;
	const selectedIcon = (props.selectedType == typeString) ? (<i className="fa fa-check fa-2x" aria-hidden="true" />) : null;

	return (
		<div className="row choice-row">
			<div className="choice-icon">
				<i className={iconString} aria-hidden="true" />
			</div>
			<div className="choice-content">
				<div className="row">
					<b>{typeString}</b>
				</div>
				<div className="row">
					{props.distance} / {props.duration} {estimatedCost}
				</div>
			</div>
			<div className="choice-selected">
				{selectedIcon}
			</div>	
		</div>

	);
}

export default ShowTransportationOption;