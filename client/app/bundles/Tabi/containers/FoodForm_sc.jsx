import React from "react";
import Geosuggest from "react-geosuggest";
import SimpleMap from "./SimpleMap_sc";
import { Modal } from "react-bootstrap";

// const LodgingForm = (props) =>{
export default class FoodForm extends React.Component {
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
		let nameType = "";
		let addressInput = "";
		console.log(this.props);

		switch (this.props.foodType) {
			case "Restaurant":
				nameType = "Restaurant";
				addressInput = <div className="highlight">{this.state.address}</div>;
				break;
			// case 'AirBnB':
			// 	nameType = 'AirBnB Host';
			//   addressInput = (<input type="text" className="form-control" id="address" placeholder="" />);

			// 	break;
			default:
				nameType = "";
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
					<div className="form-group"> Type: </div>
					<div className="row">
						<div
							className="ml-2 btn-group form-group"
							role="group"
							aria-label="Basic example"
						>
							<label className="custom-control custom-radio ml-1">
								<input
									id="breakfast"
									name="radio"
									type="radio"
									className="custom-control-input"
								/>
								<span className="custom-control-indicator" />
								<span className="custom-control-description">Breakfast</span>
							</label>
							<label className="custom-control custom-radio">
								<input
									id="lunch"
									name="radio"
									type="radio"
									className="custom-control-input"
								/>
								<span className="custom-control-indicator" />
								<span className="custom-control-description">Lunch</span>
							</label>
							<label className="custom-control custom-radio">
								<input
									id="dinner"
									name="radio"
									type="radio"
									className="custom-control-input"
								/>
								<span className="custom-control-indicator" />
								<span className="custom-control-description">Dinner</span>
							</label>
							<label className="custom-control custom-radio">
								<input
									id="snack"
									name="radio"
									type="radio"
									className="custom-control-input"
								/>
								<span className="custom-control-indicator" />
								<span className="custom-control-description">Snack</span>
							</label>
							<label className="custom-control custom-radio">
								<input
									id="drinks"
									name="radio"
									type="radio"
									className="custom-control-input"
								/>
								<span className="custom-control-indicator" />
								<span className="custom-control-description">Drinks</span>
							</label>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="name">{nameType} Name:</label>
						<Geosuggest
							placeholder="Start typing!"
							inputClassName="form-control input-colored"
							initialValue="やんばるダイニング 松の古民家"
							onSuggestSelect={this.onSuggestSelect}
							location={new google.maps.LatLng(26.2144722, 127.6763)}
							radius="20"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="address">{nameType} Address: </label>
						{" "} {addressInput}
					</div>

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
						<div className="col-3 form-group">
							<label className="" htmlFor="from">From: </label>
							<input
								type="time"
								className="form-control travel-date-inputs input-colored"
								id="from"
								value="12:00"
							/>
						</div>
						<div className="col-3 form-group">
							<label className="" htmlFor="to">To:</label>
							<input
								type="time"
								className="form-control travel-date-inputs input-colored"
								id="to"
								value="13:00"
							/>
						</div>
					</div>
					<div className="row">
						<div
							className="ml-2 btn-group form-group"
							role="group"
							aria-label="Basic example"
						>
							Price Range:
							<label className="custom-control custom-radio ml-1">
								<input
									id="radio1"
									name="radio"
									type="radio"
									className="custom-control-input"
								/>
								<span className="custom-control-indicator" />
								<span className="custom-control-description">$</span>
							</label>
							<label className="custom-control custom-radio">
								<input
									id="radio2"
									name="radio"
									type="radio"
									className="custom-control-input"
								/>
								<span className="custom-control-indicator" />
								<span className="custom-control-description">$$</span>
							</label>
							<label className="custom-control custom-radio">
								<input
									id="radio3"
									name="radio"
									type="radio"
									className="custom-control-input"
								/>
								<span className="custom-control-indicator" />
								<span className="custom-control-description">$$$</span>
							</label>
							<label className="custom-control custom-radio">
								<input
									id="radio4"
									name="radio"
									type="radio"
									className="custom-control-input"
								/>
								<span className="custom-control-indicator" />
								<span className="custom-control-description">$$$$</span>
							</label>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="notes">Notes:</label>
						<input
							type="text"
							className="form-control input-colored"
							id="notes"
							placeholder=""
						/>
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