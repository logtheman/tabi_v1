import React from "react";
import Geosuggest from "react-geosuggest";
import SimpleMap from "./SimpleMap_sc";
import { Modal } from "react-bootstrap";

// const LodgingForm = (props) =>{
export default class LodgingForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: null,
			center: null
		};
		this.onSuggestSelect = this.onSuggestSelect.bind(this);
	}

	onSuggestSelect(suggest) {
		console.log(suggest);
		this.setState({
			address: suggest.gmaps.formatted_address,
			center: {
				lat: suggest.location.lat,
				lng: suggest.location.lng
			}
		});
		console.log("center: ", this.state.center);
	}

	render() {
		const map = null;
		// = this.state.center ? (
		// 				<div style={{height: "60%", marginTop: '10px', marginRight: '10px', marginLeft: '10px', border: '1px solid black', minHeight: '100px'}}>
		// 					<SimpleMap
		// 							center={this.state.center}
		// 							activeLocation={this.state.center}
		// 					/>
		// 				</div>) : null;
		let nameType = "";
		let addressInput = "";
		console.log(this.props);

		switch (this.props.lodgingType) {
			case "Hotel":
				nameType = "Hotel";
				addressInput = <div className="highlight">{this.state.address}</div>;
				break;
			case "AirBnB":
				nameType = "AirBnB Host";
				addressInput = (
					<input
						type="text"
						className="form-control input-colored"
						id="address"
						placeholder=""
					/>
				);

				break;
			default:
				nameType = "Lodging";
				addressInput = (
					<input
						type="text"
						className="form-control input-colored"
						id="address"
						placeholder=""
					/>
				);
		}

		return (
			<div>
				<form>
					<div className="form-group">
						<label htmlFor="hotelName">{nameType} Name:</label>
						<Geosuggest
							placeholder="Start typing!"
							inputClassName="form-control input-colored"
							initialValue="NahaNa Hotel"
							onSuggestSelect={this.onSuggestSelect}
							location={new google.maps.LatLng(26.2144722, 127.6763)}
							radius="20"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="address">{nameType} Address: </label>
						{" "} {addressInput}
					</div>
					{map}

					<div className="form-group">
						<label htmlFor="URL">URL:</label>
						<input
							type="text"
							className="form-control input-colored"
							id="URL"
							placeholder=""
						/>
					</div>

					<div className="row mb-2">
						<div className="col-md-4 form-group">
							<label className="" htmlFor="checkIn">Check-in Date:</label>
							<input
								type="date"
								className="form-control travel-date-inputs input-colored"
								id="checkIn"
								placeholder=""
							/>
						</div>
						<div className="col-md-4 form-group">
							<label className="" htmlFor="checkOut">Check-out Date:</label>
							<input
								type="date"
								className="form-control travel-date-inputs input-colored"
								id="checkOut"
								placeholder=""
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3 form-group">
							<label htmlFor="estimatedCost" className="">
								Estimated Cost:
							</label>
							<div className="input-group">
								<span className="input-group-addon">$</span>
								<input
									className="form-control input-colored"
									type="text"
									id="estimatedCost"
								/>
							</div>
						</div>
						<div className="col-md-3 form-group">
							<div className="pt-4">
								<label className="custom-control custom-checkbox ">
									<input type="checkbox" className="custom-control-input" />
									<span className="custom-control-indicator" />
									<span className="custom-control-description">
										Paid in advance
									</span>
								</label>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="form-group">
							<label htmlFor="notes">Notes:</label>
							<input
								type="text"
								className="form-control input-colored"
								id="notes"
								placeholder=""
							/>
						</div>
					</div>
					<Modal.Footer>
						<button type="submit" className="btn btn-primary mr-3">
							Submit
						</button>
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

// export default LodgingForm