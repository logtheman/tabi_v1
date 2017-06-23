import React from 'react'
import { Modal } from "react-bootstrap";


const TripDatesForm = (props) => {
	
	return (
		<div>
			<form>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label htmlFor="departureDate">Start Date:</label>
							<input
								type="date"
								className="form-control"
								id="startDate"
								placeholder=""
								onChange={props.handleAddStartDate}
							/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label htmlFor="endDate">End Date:</label>
							<input
								type="date"
								className="form-control"
								id="endDate"
								placeholder=""
								onChange={props.handleAddEndDate}
							/>
						</div>
					</div>
				</div>
			
				<Modal.Footer bsClass="">
					<hr />
					<div className="row text-center">
						<div className="col-md-2" />
						<div className="col-md-8">
							<button type="submit" className="btn btn-outline-primary mr-3"
								onClick={() => props.handleAddFlight(true)}
							>
								Add Initial Flight
							</button>
							<button type="submit"
								className="btn btn-outline-info"
								onClick={() => props.handleAddFlight(false)}
							>
								Add Flight Later
							</button>
						</div>
						<div className="col-md-2" />
					</div>
				</Modal.Footer>
			</form>
		</div>
	);
}

export default TripDatesForm;