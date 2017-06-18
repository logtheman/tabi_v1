import React from 'react'
import * as api from '../../../utils/utils'


const FlightResultsList = (props) => {

	const tableBody = props.flights.map((flight, i) => {
		return(
			flight.slice[0].segment.map((segment, j) => {
				return(
					segment.leg.map((leg, k) => {
						let flightChoiceNum = i ? `#${i+1}` : 'Conn.';
						let trClass = 'single-leg';
						if(i && props.flights[i].slice[0].segment.length > 1){
							trClass = 'multi-leg';
							if(j > 0){
								if(props.flights[i].slice[0].segment.length === j-1){
									trClass += 'bottom-border';
								}
							}else{
								trClass += ' top-border';
							}
						}else{
							trClass += ' top-border bottom-border';
						}
						if(i = props.selectedFlight){
							trClass += ' selected-flight';
							console.log('add selected flight');
						}
							console.log('i: ', i);

						return(
							<tr key={i + j + k} className={trClass} onClick={() => props.onSelectFlight(i)}>
								<td>{flightChoiceNum}</td>
								<td>{flight.slice[0].segment[j].flight.carrier}{flight.slice[0].segment[j].flight.number}</td>
								<td>{flight.slice[0].segment[j].leg[k].operatingDisclosure}</td>
								<td>{flight.slice[0].segment[j].leg[k].origin}</td>
								<td>{api.getDateString(flight.slice[0].segment[j].leg[k].departureTime)}</td>
								<td>{flight.slice[0].segment[j].leg[k].destination}</td>
								<td>{api.getDateString(flight.slice[0].segment[j].leg[k].arrivalTime)}</td>
							</tr>
						);
					})
				);
			})
		);
	});


	return (
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
			<tbody>
				{tableBody}
			</tbody>	
		</table>
	);
}

export default FlightResultsList;

// let flightOptions = this.state.searchResults.trips.tripOptionmap((n, i) => {
// 	return (
// 		<tr key={i}>
// 			<td>{'#'}{i}</td>
// 			<td>{n.slice[0].segment[0].leg[0].operatingDisclosure}</td>
// 			<td>{n.slice[0].segment[0].leg[0].origin}</td>
// 			<td>{api.getDateString(n.slice[0].segment[0].leg[0].departureTime)}</td>
// 			<td>{n.slice[0].segment[0].leg[0].destination}</td>
// 			<td>{api.getDateString(n.slice[0].segment[0].leg[0].arrivalTime)}</td>
// 		</tr>
// 	);

// });
// let tableBody = (<tbody>{flightOptions}</tbody>);
// results = (<table className="table table-striped">
// 						<thead>
// 							<tr>
// 								<th>Option:</th>
// 								<th>Carrier:</th>
// 								<th>From:</th>
// 								<th>Depature:</th>
// 								<th>To:</th>
// 								<th>Arrival:</th>
//   						</tr>
//   					</thead>
//   						{tableBody}

// 					</table>