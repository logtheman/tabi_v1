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
import AIRLINES from '../fake_data/airlines.json'





// const LodgingForm = (props) =>{
export default class FlightForm extends React.Component{
		constructor(props){
			super(props);
			this.state = {
				address: null,
				center: null,
				QPXURL: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCn-htcBCbG-7-a5NLKCY8ElUV7WGziTlU',
				IATAURL: 'http://iatacodes.org/api/v6/airlines?api_key=694a8694-e38c-4aea-8370-4a7b78c4adcc',
				searchResults: '',
				selectedDepatureFlight: null,
				selectedReturnFlight: null,
				selectedAirlines: null,
				flightEarliest: '00:00',
				flightLatest: '23:59',
				depatureAirport: null,
				destinationAirport: null,
				airports: null,
				airportFilterOptions: null,
				airlines: null,
				pageIndex: 0,
				resultsPerPage: 20,
				maxSearchResult: 100,
			}

			this.handleFlightQuery = this.handleFlightQuery.bind(this);
			this.onSelectDepatureFlight = this.onSelectDepatureFlight.bind(this);
			this.handleTimeOfDayChange = this.handleTimeOfDayChange.bind(this);
			this.handleDepatureAirport = this.handleDepatureAirport.bind(this);
			this.handleDestinationAirport = this.handleDestinationAirport.bind(this);
			this.handleAirlines = this.handleAirlines.bind(this);
			this.handleSearchIndex = this.handleSearchIndex.bind(this);
		}

		componentWillMount(){
			const airportList = AIRPORTS.map((ap, i) => {
				return ({
					value: ap.airport_code,
					label: `${ap.city_name} - ${ap.airport_name} (${ap.airport_code})`,
				})
			});
			this.setState({airports: airportList});

			
			//For some reason specific words 'options', etc...are required. 
			//Use state for airports so that airlines can use options below in the render method
			const options = airportList;
			const filterOptions = createFilterOptions({ options });
			this.setState({airportFilterOptions:  filterOptions});


			const airlinesList = AIRLINES.map((al, i) => {
				return ({
					value: al.code,
					label: al.name,
				})
			});
			this.setState({airlines: airlinesList});

		}

		// mark the flight
		onSelectDepatureFlight(index){
			if(this.state.selectedDepatureFlight === index){
				this.setState({selectedDepatureFlight: null});
			}else{
				this.setState({selectedDepatureFlight: index});
			}
			console.log("selectedDepatureFlight: ", index);
		}

		handleSearchIndex(changeIndexBy){
			// index is greater than one page worth of results
			if(changeIndexBy === -1 && this.state.pageIndex >= this.state.resultsPerPage){ //go back one page
				this.setState({pageIndex: (this.state.pageIndex - this.state.resultsPerPage)});
			}
			// index is less than one page worth of results
			if(changeIndexBy === 1 && this.state.pageIndex < (this.state.maxSearchResult - this.state.resultsPerPage)){
				this.setState({pageIndex: (this.state.pageIndex + this.state.resultsPerPage)});
			}
		}

		handleFlightQuery(e, departureDate, returnDate){
			e.preventDefault();
			const flightData = {
			  "request": {
			    "passengers": {
			      "adultCount": 1
			    },
			    "slice": [
			      {
			        "origin": this.state.depatureAirport,
			        "destination": this.state.destinationAirport,
			        "date": departureDate,
			        "permittedDepartureTime": {
                "earliestTime": this.state.flightEarliest,
                "latestTime": this.state.flightLatest,
			        },
			        "permittedCarrier": this.state.selectedAirlines
			      },
			      {
			        "origin": this.state.destinationAirport,
			        "destination": this.state.depatureAirport,
			        "date": returnDate
			      }
			    ],
			    "solutions": this.state.maxSearchResult,
			    "refundable": false
			  }
			};
			console.log(flightData);
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

		handleDestinationAirport(result) {
		  result ? this.setState({destinationAirport: result.value}) : this.setState({destinationAirport: null});
		}
		handleDepatureAirport(result) {
	  	result ? this.setState({depatureAirport: result.value}) : this.setState({depatureAirport: null});
		}
		handleAirlines(result) {
	  	result ? this.setState({selectedAirlines: result.value}) : this.setState({selectedAirlines: null});
		}

		render(){



			const options = this.state.airlines;
			const filterOptions = createFilterOptions({ options });


			const results = this.state.searchResults ? 
					(<FlightResultsList 
						flights={this.state.searchResults.trips.tripOption} 
						onSelectDepatureFlight={this.onSelectDepatureFlight}
						selectedDepatureFlight={this.state.selectedDepatureFlight}
						start={this.state.pageIndex}
						end={(this.state.pageIndex + this.state.resultsPerPage)}
						handleSearchIndex={this.handleSearchIndex}
						/>) : null;

		return(
			<div>
				<form onSubmit={() => this.handleFlightQuery(event, 
					this.refs.departureDate.value, 
					this.refs.returnDate.value)}>

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
						  	filterOptions={this.state.airportFilterOptions}
						    value={this.state.depatureAirport}
						    options={this.state.airports}
						    onChange={this.handleDepatureAirport}
						    className="select-input"
						  />
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
						  <label htmlFor="destination">Going to:</label>
						  <VirtualizedSelect
						  	filterOptions={this.state.airportFilterOptions}
						    value={this.state.destinationAirport}
						    options={this.state.airports}
						    onChange={this.handleDestinationAirport}
						    className="select-input"
						  />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8">
						<div className="form-group">
						  <label htmlFor="airlines">Airlines:</label>
						  <VirtualizedSelect
						  	filterOptions={filterOptions}
						    value={this.state.selectedAirlines}
						    options={options}
						    onChange={this.handleAirlines}
						    className="select-input"
						  />
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