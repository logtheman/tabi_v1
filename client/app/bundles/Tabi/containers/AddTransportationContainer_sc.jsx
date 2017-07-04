import React from "react";
import onClickOutside from 'react-onclickoutside'
import { Modal } from "react-bootstrap";
import * as api from "../../utils/utils";
import ShowTransportationOption from "../components/single_day_components/ShowTransportationOption_dc";



class AddTransportationContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			origin: {
				lat: props.transportation.startLocation.lat,
				lng: props.transportation.startLocation.lng
			},
			destination: {
				lat: props.transportation.endLocation.lat,
				lng: props.transportation.endLocation.lng
			},
			styles: {
				top: null,
				left: null,
			},
			transportation: props.transportation,
			distanceService: new google.maps.DistanceMatrixService(),
			APIKey: 'AIzaSyC9RTnGF3gb3KMDfijxRi8yOns5VSE5Aew',
			travelModes: ['DRIVING', 'TRANSIT', 'BICYCLING', 'WALKING', 'BUS'],
			transportationOptions: [''],

		};
		this.handleTransportationQuery = this.handleTransportationQuery.bind(this);
		this.queryCallback= this.queryCallback.bind(this);

	}

	handleClickOutside(evt) {
	  this.props.handleRemoveTransportationContainer();
	}

	componentWillMount(){
		this.state.travelModes.map((mode, index) => {
			this.handleTransportationQuery(mode);
		})
		const element = document.getElementById(`TA${this.props.id}`);
		const elementPos = element.getBoundingClientRect();

		this.setState({styles: {
			top: elementPos.top + window.scrollY + 30,
			left: elementPos.left + window.scrollX + 60
		}});
	}

	handleTransportationQuery(type) {
		let transitOptions = null;
		let travelMode = type;
		if (type === 'TRANSIT' || type === 'BUS'){
		 travelMode = "TRANSIT";
		 let modes = type === 'BUS' ? 'BUS' : ['RAIL', 'TRAM', 'SUBWAY', 'TRAIN'];
		 transitOptions = {
			  arrivalTime: this.props.transportation.startAt,
			  departureTime: this.props.transportation.endAt,
			  modes: modes,
			  // routingPreference: TransitRoutePreference
			};
		}

		const options = {
		  origins: [this.state.origin],
		  destinations: [this.state.destination],
		  travelMode: travelMode,
		  // transitOptions: transitOptions,
		  unitSystem: google.maps.UnitSystem.IMPERIAL,
		  avoidHighways: false,
		  avoidTolls: false,
		}
		this.state.distanceService.getDistanceMatrix(options, (response, status) => {
			if (status === 'OK'){
				let distance = null;
				let duration = null;
				let cost = null;
				if(response.rows[0].elements[0].status === "ZERO_RESULTS" || !response.rows[0].elements[0]){
					distance = "N/A";
					duration = "No Results";
				}else {
					distance = response.rows[0].elements[0].distance.text;
					duration = response.rows[0].elements[0].duration.text;
					cost = response.rows[0].elements[0].fare ? response.rows[0].elements[0].fare.text : null;
				}

				
				const showOptions =(
						<div key={type}>
							<ShowTransportationOption 
								transportationType={type}
								distance={distance}
								duration={duration}
								estimatedCost={cost}
								selectedType={this.state.transportation.transportationType}
							/>
						</div>

					);

				this.setState({transportationOptions: [...this.state.transportationOptions, showOptions]});
			}
		});
	}

	queryCallback(response, status) {
	    if (status === 'OK'){
	    	console.log(response);

	    	let distance = null;
	    	let duration = null;
	    	let cost = null;
	    	if(response.rows[0].elements[0].status === "ZERO_RESULTS" || !response.rows[0].elements[0]){
	    		distance = "N/A";
	    		duration = "No Results";
	    	}else {
	    		distance = response.rows[0].elements[0].distance.text;
	    		duration = response.rows[0].elements[0].duration.text;
	    		cost = response.rows[0].elements[0].fare ? response.rows[0].elements[0].fare.text : null;
	    	}

	    	
	    	const showOptions =(<ShowTransportationOption 
	    			transportationType={this.state.transportation.transportationType}
	    			distance={distance}
	    			duration={duration}
	    			estimatedCost={cost}
	    		/>
	    		);

	    	this.setState({transportationOptions: [...this.state.transportationOptions, showOptions]});
	    }
	 }

	render() {

		return (
			<div
				id="transportation-container"
				className="add-transportation-container"
				style={this.state.styles}
			>
				<Modal.Body className="pt-2">
					{this.state.transportationOptions}
				</Modal.Body>
			</div>
		);
	}
}

export default onClickOutside(AddTransportationContainer);