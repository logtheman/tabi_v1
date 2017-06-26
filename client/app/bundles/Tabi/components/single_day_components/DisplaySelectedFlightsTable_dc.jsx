import React from 'react'
import * as api from "../../../utils/utils";


const DisplaySelectedFlightsTable = (props) => {

	const flights = props.selectedFlights.map((flightIndex, i) => {
		return props.allFlights[flightIndex].slice[i].segment.map((segment, j) => {
			return segment.leg.map((leg, k) => {
				let trClass = "single-leg"; //default styles
				const separatedLine = i > 0 ? (<hr />) : '';

				return (
					<tr
						key={i}
						className={trClass}
					>
						<td>{`#${flightIndex +1}`}</td>
						<td>
							{props.allFlights[flightIndex].slice[i].segment[j].flight.carrier}
							{props.allFlights[flightIndex].slice[i].segment[j].flight.number}
						</td>
						<td>{props.allFlights[flightIndex].slice[i].segment[j].leg[k].operatingDisclosure}</td>
						<td>{props.allFlights[flightIndex].slice[i].segment[j].leg[k].origin}</td>
						<td>
							{api.getDateString(
								props.allFlights[flightIndex].slice[i].segment[j].leg[k].departureTime
							)}
						</td>
						<td>{props.allFlights[flightIndex].slice[i].segment[j].leg[k].destination}</td>
						<td>
							{api.getDateString(
								props.allFlights[flightIndex].slice[i].segment[j].leg[k].arrivalTime
							)}
						</td>
					</tr>

			);
			});
		});
	});


	return(
		<div>
			<div className="row">
				<div className="col-2" />
				<div className="col-8  text-center">
					<h4>Selected Flights</h4>
				</div>
				<div className="col-2" />
			</div>
			<table className="table">
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
					{flights}
				</tbody>
			</table>
		</div>
	);
};

export default DisplaySelectedFlightsTable;