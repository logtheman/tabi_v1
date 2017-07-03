import React from "react";
import { Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import VirtualizedSelect from "react-virtualized-select";
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import createFilterOptions from "react-select-fast-filter-options";
import FlightResultsList from "../components/single_day_components/FlightResultsList_dc";
import DisplaySelectedFlightsTable from "../components/single_day_components/DisplaySelectedFlightsTable_dc";
import SpinnerButton from "../components/single_day_components/SpinnerButton_dc";
import SimpleMap from "./SimpleMap_sc";
import * as api from "../../utils/utils";

//JSON Files
import AIRPORTS from "../fake_data/airport_list.json";
import AIRLINES from "../fake_data/airlines.json";
import SAMPLEFLIGHTS from "../fake_data/sfo_tpe.json";


/*********************************** QPX Information and Methodology *******************************

Flight information comes in as an array of objects. Each object has a slice which represents a 
origin to destination route. A round trip will have two slices (0 and 1). A one way trip will have
one slice. There can be multiple segments, which respresent flights with connections.

***************************************************************************************************/

// const LodgingForm = (props) =>{
export default class FlightForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: null,
			center: null,
			QPXURL:
				"https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCn-htcBCbG-7-a5NLKCY8ElUV7WGziTlU",
			IATAURL:
				"http://iatacodes.org/api/v6/airlines?api_key=694a8694-e38c-4aea-8370-4a7b78c4adcc",
			searchResults: null,
			isloading: false,
			// selectedDepatureFlight: null,
			// selectedReturnFlight: null,
			departureDate: props.departureDate,
			returnDate: props.returnDate,
			selectedFlights: [],
			selectedAirlines: null,
			sliceIndex: 0, //0 is initial flight and 1 is return flight - this is how QPX does flights
			flightEarliest: "00:00",
			flightLatest: "23:59",
			depatureAirport: null,
			destinationAirport: null,
			airports: null,
			airportFilterOptions: null,
			airlines: null,
			pageIndex: 0,
			resultsPerPage: 20,
			maxSearchResult: 200,
			roundTrip: true,
		};

		this.handleFlightQuery = this.handleFlightQuery.bind(this);
		this.handleSelectFlight = this.handleSelectFlight.bind(this);
		this.handleTimeOfDayChange = this.handleTimeOfDayChange.bind(this);
		this.handleChangeDepartureDate = this.handleChangeDepartureDate.bind(this);
		this.handleChangeReturnDate = this.handleChangeReturnDate.bind(this);
		this.handleDepatureAirport = this.handleDepatureAirport.bind(this);
		this.handleDestinationAirport = this.handleDestinationAirport.bind(this);
		this.handleAirlines = this.handleAirlines.bind(this);
		this.handleSearchIndex = this.handleSearchIndex.bind(this);
		this.handleChangeSlice = this.handleChangeSlice.bind(this);
	}

	componentWillMount() {
		const airportList = AIRPORTS.map((ap, i) => {
			return {
				value: ap.airport_code,
				label: `${ap.city_name} - ${ap.airport_name} (${ap.airport_code})`
			};
		});
		this.setState({ airports: airportList });

		//For some reason specific words 'options', etc...are required.
		//Use state for airports so that airlines can use options below in the render method
		const options = airportList;
		const filterOptions = createFilterOptions({ options });
		this.setState({ airportFilterOptions: filterOptions });

		const airlinesList = AIRLINES.map((al, i) => {
			return {
				value: al.code,
				label: al.name
			};
		});
		this.setState({ airlines: airlinesList });
	}

	handleChangeDepartureDate(date){
		this.setState({departureDate: date});
	}

	handleChangeReturnDate(date){
		this.setState({returnDate: date});
	}

	handleChangeSlice(changeSliceBy) {
		if(changeSliceBy === 1 && (this.state.sliceIndex < 2)){
			this.setState({sliceIndex: this.state.sliceIndex+1});
		}else if (changeSliceBy === -1 && (this.state.sliceIndex > 0)){
			this.setState({sliceIndex: this.state.sliceIndex-1});
		}
	}

	// mark the flight
	handleSelectFlight(index, sliceIndex) {
		let selectedFlightsArray = [ ...this.state.selectedFlights];
		selectedFlightsArray[sliceIndex] = index;
		this.setState({ selectedFlights: selectedFlightsArray });
	}



	handleSearchIndex(changeIndexBy) {
		// index is greater than one page worth of results
		if (
			changeIndexBy === -1 &&
			this.state.pageIndex >= this.state.resultsPerPage
		) {
			//go back one page
			this.setState({
				pageIndex: this.state.pageIndex - this.state.resultsPerPage
			});
		}
		// index is less than one page worth of results
		if (
			changeIndexBy === 1 &&
			this.state.pageIndex <
				this.state.maxSearchResult - this.state.resultsPerPage
		) {
			this.setState({
				pageIndex: this.state.pageIndex + this.state.resultsPerPage
			});
		}
		console.log("pageindex: ", this.state.pageIndex);
	}

	handleFlightQuery(e, departureDate, returnDate) {
		e.preventDefault();
		const flightData = {
			request: {
				passengers: {
					adultCount: 1
				},
				slice: [
					{
						origin: this.state.depatureAirport,
						destination: this.state.destinationAirport,
						date: this.state.departureDate.format('YYYY-MM-DD'),
						permittedDepartureTime: {
							earliestTime: this.state.flightEarliest,
							latestTime: this.state.flightLatest
						},
						permittedCarrier: this.state.selectedAirlines
					},
					{
						origin: this.state.destinationAirport,
						destination: this.state.depatureAirport,
						date: this.state.returnDate.format('YYYY-MM-DD'),
					}
				],
				solutions: this.state.maxSearchResult,
				refundable: false
			}
		};
		console.log(flightData);
		this.setState({isloading: true});
		const response = api
			.post(this.state.QPXURL, flightData, "", "internal")
			.then(json => {
					this.setState({isloading: false});
				console.log(json);
				this.setState({ searchResults: json });
			});
		// this.setState({ searchResults: SAMPLEFLIGHTS });
	}

	handleTimeOfDayChange(tod) {
		// e.preventDefault();
		// let tod = e.target.value;
		switch (tod) {
			case "morning":
				this.setState({
					flightEarliest: "00:01", 
					flightLatest: "11:59" 
				});
				break;
			case "afternoon":
				this.setState({
					flightEarliest: "12:00",
					flightLatest: "16:59"
				});
				break;
			case "evening":
				this.setState({
					flightEarliest: "17:00",
					flightLatest: "23:59"
				});
				break;
			default:
				this.setState({
					flightEarliest: "00:00",
					flightLatest: "23:59"
				});
		}
	}

	handleActiveClass(earliestTime){
	  let classString = "btn btn-secondary";
	  if(earliestTime === this.state.flightEarliest){
	    classString += " active";
	  }
	  return classString;
	}

	handleDestinationAirport(result) {
		result
			? this.setState({ destinationAirport: result.value })
			: this.setState({ destinationAirport: null });
	}
	handleDepatureAirport(result) {
		result
			? this.setState({ depatureAirport: result.value })
			: this.setState({ depatureAirport: null });
	}
	handleAirlines(result) {
		result
			? this.setState({ selectedAirlines: result.value })
			: this.setState({ selectedAirlines: null });
	}

	render() {
		console.log("depature: ", this.props.departureDate);
		const options = this.state.airlines;
		const filterOptions = createFilterOptions({ options });

		const results = this.state.searchResults
			? <FlightResultsList
					flights={this.state.searchResults.trips.tripOption}
					handleSelectFlight={this.handleSelectFlight}
					selectedFlightIndex={this.state.selectedFlights[this.state.sliceIndex]}
					start={this.state.pageIndex}
					end={this.state.pageIndex + this.state.resultsPerPage}
					handleSearchIndex={this.handleSearchIndex}
					showPreviousPage={(this.state.pageIndex >= this.state.resultsPerPage)}
					showNextPage={
						(this.state.pageIndex <
						(this.state.maxSearchResult - this.state.resultsPerPage))
					}
					resultsPerPage={this.state.resultsPerPage}
					sliceIndex={this.state.sliceIndex}
					handleChangeSlice={this.handleChangeSlice}
				/>
			: null;

		const displaySelectedFlights = (this.state.selectedFlights.length > 0)
			? (<div className="row border-top-1px border-bottom-1px mt-1">
						<div className="col-12 pt-2">
							<DisplaySelectedFlightsTable
								selectedFlights={this.state.selectedFlights}
								allFlights={this.state.searchResults.trips.tripOption}
							/>
						</div>
					</div>
				)
			: null;

		const flightSearchButton = (this.state.selectedFlights.length === 2) ? 
			(<NavLink to="/single_day">
				<button type="submit" className="btn btn-primary mr-3"> 
					Proceed with Selected
				</button></NavLink>) :
			 (<SpinnerButton loading={this.state.isloading} handleFlightQuery={this.handleFlightQuery}>
			 	Search Flights </SpinnerButton>);

		return (
			<div>
				<form>

					<div className="row">
						<div className="col-md-6">	
							<div className="form-group">
								<label htmlFor="departureDate" style={{width:"100%"}}>
									Leaving on
								</label>

								<DatePicker
								    selected={this.state.departureDate}
								    selectsStart
								    startDate={this.state.departureDate}
								    endDate={this.state.returnDate}
								    onChange={this.handleChangeDepartureDate}
								/>
							</div>
						</div>
						<div className="col-md-6">	
							<div className="form-group" >
								<label htmlFor="returnDate" style={{width:"100%"}}>
									Returning on
								</label>
								<DatePicker
								    selected={this.state.returnDate}
								    selectsEnd
								    startDate={this.state.departureDate}
								    endDate={this.state.returnDate}
								    onChange={this.handleChangeReturnDate}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12	">
							<div className="form-group">
								<label htmlFor="origin">Depaturing from</label>
								<VirtualizedSelect
									filterOptions={this.state.airportFilterOptions}
									value={this.state.depatureAirport}
									options={this.state.airports}
									onChange={this.handleDepatureAirport}
									className="select-input"
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
								<label htmlFor="destination">Going to</label>
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
						<div className="col-md-12">
							<div className="form-group">
								<label htmlFor="airlines">Airlines 
									<span className="optional-label"> 
										 {' '}(optional) 
									</span>
								</label>
								<VirtualizedSelect
									filterOptions={filterOptions}
									value={this.state.selectedAirlines}
									options={options}
									onChange={this.handleAirlines}
									className="select-input"
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
								<label htmlFor="timeOfDay">Time of Day
									<span className="optional-label"> 
										 {' '}(optional)
									</span>
								</label><br />
							<div className="btn-group" data-toggle="buttons" >
							  <label className={this.handleActiveClass('00:00')}>
							    <input type="radio" 
							    	onClick={() => this.handleTimeOfDayChange('any')} 
							    	/> Any Time
							  </label>
							  <label className={this.handleActiveClass('00:01')}>
							    <input type="radio" 
							    	onClick={() => this.handleTimeOfDayChange('morning')} 

							    	/> Morning
							  </label>
							  <label className={this.handleActiveClass('12:00')}>
							    <input type="radio" onClick={() => this.handleTimeOfDayChange('afternoon')} /> Afternoon
							  </label>
							  <label className={this.handleActiveClass('17:00')}>
							    <input type="radio" onClick={() => this.handleTimeOfDayChange('evening')} /> Evening
							  </label>
							</div>
						</div>
					</div>
				</div>
					{results}

					{displaySelectedFlights}
					<Modal.Footer>
						{flightSearchButton}
						<button
							type="close"
							className="btn btn-secondary"
							onClick={() => this.props.onClose("")}
						>
							Close
						</button>
					</Modal.Footer>

				</form>
			</div>
		);
	}
}
