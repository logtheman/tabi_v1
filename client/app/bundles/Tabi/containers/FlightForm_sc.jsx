import React from 'react'
import { Modal } from 'react-bootstrap'
import FlightResultsList from '../components/single_day_components/FlightResultsList_dc'
import Geosuggest from 'react-geosuggest'
import SimpleMap from './SimpleMap_sc'
import * as api from '../../utils/utils'


// const LodgingForm = (props) =>{
export default class FlightForm extends React.Component{
		constructor(props){
			super(props);
			this.state = {
				address: null,
				center: null,
				QPXURL: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCn-htcBCbG-7-a5NLKCY8ElUV7WGziTlU',
				searchResults: '',
				selectedFlight: null,
				flightEarliest: '00:00',
				flightLatest: '23:59',
			}
			this.handleFlightQuery = this.handleFlightQuery.bind(this);
			this.onSelectFlight = this.onSelectFlight.bind(this);
			this.handleTimeOfDayChange = this.handleTimeOfDayChange.bind(this);

		}


		onSuggestSelect(suggest) {

		}	

		onSelectFlight(index){
			this.setState({selectedFlight: index});
			console.log("selectedFlight: ", index);
		}

		handleFlightQuery(e, origin, departureDate, destination, returnDate, airlines){
			e.preventDefault();
			const flightData = {
			  "request": {
			    "passengers": {
			      "adultCount": 1
			    },
			    "slice": [
			      {
			        "origin": origin,
			        "destination": destination,
			        "date": departureDate,
			        "permittedDepartureTime": {
                "earliestTime": this.state.flightEarliest,
                "latestTime": this.state.flightLatest,
			        },
			        "permittedCarrier": [airlines]
			      },
			      {
			        "origin": destination,
			        "destination": origin,
			        "date": returnDate
			      }
			    ],
			    "solutions": 20,
			    "refundable": false
			  }
			};
			const response = api.post(this.state.QPXURL, flightData, '', 'internal')
			.then(json=>{
				console.log(json);
				this.setState({searchResults: json});

			});
		}

		handleTimeOfDayChange(e){
			e.preventDefault();
			let tod = e.target.value;
			switch(tod){
				case ('morning'):
					this.setState({flightLatest: '11:59'});
					break;
				case ('afternoon'):
					this.setState({
						flightEarliest: '12:00',
						flightLatest: '16:59'
					});
					break;
				case ('evening'):
					this.setState({
						flightEarliest: '17:00',
						flightLatest: '23:59'
					});
					break;	
				default:
					this.setState({
						flightEarliest: '00:00',
						flightLatest: '23:59'
					});
			}

		}

		render(){

			let nameType = '';
			let addressInput = '';

			const results = this.state.searchResults ? 
					(<FlightResultsList 
						flights={this.state.searchResults.trips.tripOption} 
						onSelectFlight={this.onSelectFlight}
						selectedFlight={this.state.selectedFlight}
						/>) : null;

		return(
			<div>
				<form onSubmit={() => this.handleFlightQuery(event, this.refs.origin.value, 
					this.refs.departureDate.value, this.refs.destination.value, 
					this.refs.returnDate.value, this.refs.airlines.value)}>

				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
						  <label htmlFor="departureDate">Depature Date:</label>
						  <input type="date"  className="form-control" id="departureDate" placeholder="" ref="departureDate"/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
						  <label htmlFor="returnDate">Return Date:</label>
						  <input type="date"  className="form-control" id="returnDate" placeholder="" ref="returnDate"/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
						  <label htmlFor="origin">Depaturing from:</label>
						  <input type="text" className="form-control" id="origin" placeholder="i.e. SFO" ref="origin"/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
						  <label htmlFor="destination">Going to:</label>
						  <input type="text"  className="form-control" id="destination" placeholder="i.e. LAX" ref="destination"/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8">
						<div className="form-group">
						  <label htmlFor="airlines">Airlines:</label>
						  <input type="text" className="form-control" id="airlines" placeholder="i.e. Turkish Air, Delta, etc..." ref="airlines"/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
						  <label htmlFor="timeOfDay">Time of Day:</label><br />
						  <select className="custom-select" onChange={this.handleTimeOfDayChange}>
						    <option defaultValue>Time of day</option>
						    <option value="any">Any</option>
						    <option value="morning">Morning</option>
						    <option value="afternoon">Afternoon</option>
						    <option value="evening">Evening</option>
						  </select>
						</div>
					</div>
				</div>
				{ results }


	    	  <Modal.Footer>
	    		  <button type="submit" className="btn btn-primary mr-3">{this.props.submitButton}</button>
	    		  <button type="close" className="btn btn-secondary" onClick={() => this.props.onClose('')}>Close</button>
	    	  </Modal.Footer>

				</form>
		  </div>
		)
	}
}

// export default LodgingForm