import React from "react";
import * as api from "../../../utils/utils";

const FlightResultsList = props => {
	const tableBody = props.flights
		.slice(props.start, props.end)
		.map((flight, i) => {
			return flight.slice[props.sliceIndex].segment.map((segment, j) => {
				return segment.leg.map((leg, k) => {
					const flightIndex = props.flights.indexOf(flight); //retrieve index as variable i shows null on the second leg
					let flightChoiceNum = `#${flightIndex + 1}`;
					let trClass = "single-leg"; //default styles
					if (props.flights[flightIndex].slice[props.sliceIndex].segment.length > 1) {
						//if multi leg flight
						trClass = "multi-leg"; //style both legs
						if (j > 0) {
							flightChoiceNum = "Conn."; //after the first leg row, indicate that this is a connection
							if (
								props.flights[flightIndex].slice[props.sliceIndex].segment.length ===
								j - 1
							) {
								trClass += "bottom-border"; //if the last leg add a border
							}
						} else {
							trClass += " top-border"; //first leg
						}
					} else {
						trClass += " top-border bottom-border"; //single leg flights
					}
					if (flightIndex === props.selectedFlightIndex) {
						trClass += " selected-flight";
					}

					return (
						<tr
							key={flightIndex + j + k}
							className={trClass}
							onClick={() => props.handleSelectFlight(flightIndex, props.sliceIndex)}
						>
							<td>{flightChoiceNum}</td>
							<td>
								{flight.slice[props.sliceIndex].segment[j].flight.carrier}
								{flight.slice[props.sliceIndex].segment[j].flight.number}
							</td>
							<td>{flight.slice[props.sliceIndex].segment[j].leg[k].operatingDisclosure}</td>
							<td>{flight.slice[props.sliceIndex].segment[j].leg[k].origin}</td>
							<td>
								{api.getDateString(
									flight.slice[props.sliceIndex].segment[j].leg[k].departureTime
								)}
							</td>
							<td>{flight.slice[props.sliceIndex].segment[j].leg[k].destination}</td>
							<td>
								{api.getDateString(
									flight.slice[props.sliceIndex].segment[j].leg[k].arrivalTime
								)}
							</td>
						</tr>
					);
				});
			});
		});

	const previousPage = props.showPreviousPage
		? <button
				className="mr-1 btn btn-primary btn-sm"
				onClick={() => props.handleSearchIndex(-1)}
			>
				<i className="fa fa-arrow-left" aria-hidden="true" />
				{` previous ${props.resultsPerPage} `}
			</button>
		: null;

	const nextPage = props.showNextPage
		? <button
				className="ml-1 btn btn-primary btn-sm"
				onClick={() => props.handleSearchIndex(1)}
			>
				{` next ${props.resultsPerPage} `}
				<i className="fa fa-arrow-right" aria-hidden="true" />
			</button>
		: null;

		const nextFlightButton = props.sliceIndex < 1 ? (
				<button className="btn btn-success" onClick={() => props.handleChangeSlice(1)}> Return Flight </button>
			) : null ;
		const previousFlightButton = (props.sliceIndex > 0 && props.sliceIndex < 2)  ? (
				<button className="btn btn-success" onClick={() => props.handleChangeSlice(-1)}> Depature Flight </button>
			) : null ;

	return (
		<div>
			<table className="table mb-2 mt-2">
				<thead>
					<tr>
						<th>Option:</th>
						<th>Flight #:</th>
						<th>Carrier:</th>
						<th>From:</th>
						<th>Depature:</th>
						<th>To:</th>
						<th>Arrival:</th>
					</tr>
				</thead>
				<tbody className="flight-options">
					{tableBody}

				</tbody>
			</table>
			<div className="row mb-1">
				<div className="col-3" >
					{previousFlightButton}
				</div>
				<div className="col-6  text-center">
					{previousPage}
					{nextPage}
				</div>
				<div className="col-3" >
					{nextFlightButton}
				</div>
			</div>
		</div>
	);
};

export default FlightResultsList;