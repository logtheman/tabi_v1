import React from 'react'
import { Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const TripDatesForm = (props) => {
	
	return (
		<div>
			<form>
				<div className="row">
					<div className="col-12 form-group text-center">	
						From: {' '}
						<DatePicker
						    selected={props.tripStartDate}
						    selectsStart
						    startDate={props.tripStartDate}
						    endDate={props.tripEndDate}
						    onChange={props.handleAddStartDate}
						/>
						To: {' '}
						<DatePicker
						    selected={props.tripEndDate}
						    selectsEnd
						    startDate={props.tripStartDate}
						    endDate={props.tripEndDate}
						    onChange={props.handleAddEndDate}
						/>
						<button type="submit" className="btn btn-primary"
							onClick={() => props.handleAddFlight(true)}
						>
							Add Flight
						</button>
						<NavLink to="/single_day">
							<button type="submit"
								className="btn btn-secondary"
								onClick={() => props.handleAddFlight(false)}
							>
								Skip Flight
							</button>
						</NavLink>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TripDatesForm;

