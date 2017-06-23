import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as api from "../../utils/utils";
import BootstrapModal from "../components/single_day_components/BootstrapModal_dc";
import TripDatesForm from "../components/single_day_components/TripDatesForm_dc";
import FlightForm from "./FlightForm_sc";

export default class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newTrip: false,
			windowHeight: window.innerHeight,
			tripStartDate: null,
			tripEndDate: null,
			showFlightForm: null,

		};

		this.handleAddStartDate = this.handleAddStartDate.bind(this);
		this.handleAddEndDate = this.handleAddEndDate.bind(this);

		this.handleNewTrip = this.handleNewTrip.bind(this);
		this.handleAddFlight = this.handleAddFlight.bind(this);
		this.handleWindowSize = this.handleWindowSize.bind(this);
		window.addEventListener("resize", this.handleWindowSize);

	}

	handleAddFlight(addFlight){
		this.setState({showFlightForm: addFlight});
	}

	handleAddStartDate(e){
		e.preventDefault();
		this.setState({
			tripStartDate: e.target.value,
		});
	}

	handleAddEndDate(e){
		e.preventDefault();
		this.setState({
			tripEndDate: e.target.value,
		});
	}

	handleNewTrip() {
		if(this.state.newTrip){
			this.setState({ 
				newTrip: !this.state.newTrip,
				showFlightForm: null
			});
		}else{
			this.setState({ newTrip: !this.state.newTrip });
		}
	}

	handleWindowSize(){
		this.setState({windowHeight: window.innerHeight});
	}

	render() {
		const selectionButtons = (
			<div className="container pt-3">
				<div className="center-block button-container">
					<div className="open-buttons ">
						<button
							type="button"
							onClick={this.handleNewTrip}
							className="btn btn-outline-primary btn-block new-trip mt-4"
						>
							<i className="fa fa-plus " aria-hidden="true" />
							{" "}Plan a trip
						</button>
						<button
							type="button"
							className="btn btn-outline-success btn-block edit-trip mt-3"
						>
							<i className="fa fa-pencil-square-o " aria-hidden="true" />
							{" "}Edit exiting trip
						</button>
						<button
							type="button"
							className="btn btn-outline-danger btn-block explore-trips mt-3"
						>
							<i className="fa fa-eye" aria-hidden="true" />
							{" "}Explore trips
						</button>
					</div>
				</div>

			</div>
		);

		const dateRange = (
			<div className="container trip-dates mt-5">
				<div className="center-block">
					<form className="center-block">
						<div className="row">
							<div className="col-6">
								<label className="text-shadow" htmlFor="tripStart">
									Start Date
								</label>
							</div>
							<div className="col-6">
								<label className="text-shadow" htmlFor="tripEnd">
									End Date
								</label>
							</div>
						</div>
						<div className="row">
							<div className="col-6">
								<label className="sr-only" htmlFor="tripStart">
									Start Date
								</label>
								<input
									type="date"
									className="form-control travel-date-inputs"
									id="tripStart"
									placeholder="Start Date"
								/>
							</div>
							<div className="col-6">
								<label className="sr-only" htmlFor="tripEnd">End Date</label>
								<input
									type="date"
									className="form-control travel-date-inputs"
									id="tripEnd"
									placeholder="Choose a Date"
								/>
							</div>
						</div>
						<div className="row mt-1	">
							<div className="col-md-6 offset-md-3">
								<Link to="/single_day">
									<button
										type="button"
										className="btn btn-outline-primary btn-block start-trip-button "
									>
										Plan Trip!
									</button>
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div> //end of container
		);


		const displayForm = this.state.showFlightForm ? (
				<FlightForm
					titleChange={this.handleModalHeaderChange}
					onClose={this.handleNewTrip}
					departureDate={this.state.tripStartDate}
					returnDate={this.state.tripEndDate}
					submitButton={"Search Flights"}
				/>
			) : (
				<TripDatesForm
					handleAddStartDate={this.handleAddStartDate}
					handleAddEndDate={this.handleAddEndDate}
					handleAddFlight={this.handleAddFlight}
				/>
			);

		const displayModal = this.state.newTrip
			? <BootstrapModal
					onClose={this.handleNewTrip}
					title={"Start New Trip"}
					topMargin={"100px"}
					backdrop={true}
				>
					{displayForm} 
				</BootstrapModal>
			: null;
		// const showOptions = this.state.newTrip ? dateRange : selectionButtons;

		return (
			<div
				className="banner text-center mb-3"
				style={{ height: this.state.windowHeight }}
			>
				<div className="pt-4 text-shadow">
					<h1 className="display-1"><strong>Tabi</strong></h1>
					<h3 className="mt-3 text-shadow">Plan Your Journey</h3>
				</div>
				{selectionButtons}
				{displayModal}

			</div>
		);
	}
}