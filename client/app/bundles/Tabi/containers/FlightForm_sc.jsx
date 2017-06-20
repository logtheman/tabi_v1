import React from 'react'
import { Modal } from 'react-bootstrap'
import VirtualizedSelect from 'react-virtualized-select'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import createFilterOptions from 'react-select-fast-filter-options';
import FlightResultsList from '../components/single_day_components/FlightResultsList_dc'
import SimpleMap from './SimpleMap_sc'
import * as api from '../../utils/utils'
// import AIRPORTS from '../fake_data/airports.json'
import AIRPORTS from '../fake_data/airport_list.json'




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
				depatureAirport: null,
				airports: null,
			}

			this.handleFlightQuery = this.handleFlightQuery.bind(this);
			this.onSelectFlight = this.onSelectFlight.bind(this);
			this.handleTimeOfDayChange = this.handleTimeOfDayChange.bind(this);
			this.logChange = this.logChange.bind(this);

		}

		componentWillMount(){
			const airportList = AIRPORTS.map((a, i) => {
				return ({
					value: a.airport_code,
					label: `${a.city_name} - ${a.airport_name} (${a.airport_code})`,
				})
			});
			this.setState({airports: airportList});
		}

		onSelectFlight(index){
			if(this.state.selectedFlight === index){
				this.setState({selectedFlight: null});
			}else{
				this.setState({selectedFlight: index});
			}
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

		logChange(result) {
		  console.log("Selected: " + result);
		  result ? this.setState({depatureAirport: result.value}) : this.setState({depatureAirport: null})
		}

		render(){

			const options = this.state.airports;
			const filterOptions = createFilterOptions({ options });

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
						  <VirtualizedSelect
						  	filterOptions={filterOptions}
						    value={this.state.depatureAirport}
						    options={this.state.airports}
						    onChange={this.logChange}
						    className="select-input"
						  />
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

							<VirtualizedSelect
								filterOptions={filterOptions}
							  value={this.state.depatureAirport}
							  options={this.state.airports}
							  onChange={this.logChange}
							  className="select-input"
							/>

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