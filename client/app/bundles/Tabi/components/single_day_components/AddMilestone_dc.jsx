import React from "react";
import ReactTooltip from "react-tooltip";

const AddMilestone = props => {
	return (
		<div className="add-activity-buttons button-container text-center">
			<div className={`${props.viewType}`}>
				<div className="text-center py-1">
					<h3><small className="text-muted">Add to Plan:</small>{" "}
					</h3>
					<button
						data-for="lodging"
						data-tip="true"
						className="btn btn-outline-info btn-sm mr-2 ml-2 mb-1"
						onClick={() =>
							props.handleAddMilestone("lodging", "Type of Lodging:")}
					>
						<i
							className="fa fa-bed fa-2x pr-2 add-activity-icon"
							aria-hidden="true"
						/>
						Lodging
					</button>
					<ReactTooltip id="lodging" type="dark" effect="solid">
						<span>
							Add hotel, AirBnB or a friends address to your lodging plan!
						</span>
					</ReactTooltip>

					{" "}
					<button
						data-for="food"
						data-tip="true"
						className="btn btn-outline-success btn-sm mr-2 mb-1"
						onClick={() =>
							props.handleAddMilestone("food", "Type of meal plan:")}
					>
						<i
							className="fa fa-cutlery fa-2x pr-2 add-activity-icon"
							aria-hidden="true"
						/>
						Food
					</button>
					<ReactTooltip id="food" type="dark" effect="solid">
						<span>
							Plan a meal at a restaurant, go for drinks, <br />or general plan
							to eat around a certain time and place.
						</span>
					</ReactTooltip>

					{" "}
					<button
						data-for="activity"
						data-tip="true"
						className="btn btn-outline-warning btn-sm mr-2 mb-1"
						onClick={() =>
							props.handleAddMilestone("activity", "Activity Information:")}
					>
						<i
							className="fa fa-map-marker fa-2x pr-2 add-activity-icon"
							aria-hidden="true"
						/>
						Activity
					</button>
					<ReactTooltip id="activity" type="dark" effect="solid">
						<span>
							Plan a tour, museum or any other general activity and add a time
							and place.
						</span>
					</ReactTooltip>

					{" "}
					<button
						data-for="flight"
						data-tip="true"
						className="btn btn-outline-danger btn-sm mr-2 mb-1"
						onClick={() =>
							props.handleAddMilestone("flight", "Flight Information:")}
					>
						<i
							className="fa fa-plane fa-2x pr-2 add-activity-icon"
							aria-hidden="true"
						/>
						Flight
					</button>

				</div>
			</div>
		</div>
	);
};

export default AddMilestone;