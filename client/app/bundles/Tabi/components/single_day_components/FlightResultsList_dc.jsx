import React from 'react'
import * as api from '../../../utils/utils'


const FlightResultsList = (props) => {

	const tableBody = props.flights.map((flight, i) => {
		return(
			flight.slice[0].segment.map((segment, j) => {
				return(
					segment.leg.map((leg, k) => {
						const flightIndex = props.flights.indexOf(flight); //retrieve index as variable i shows null on the second leg
						let flightChoiceNum = `#${i+1}`; 
						let trClass = 'single-leg'; //default styles
						if(props.flights[flightIndex].slice[0].segment.length > 1){ //if multi leg flight
							trClass = 'multi-leg'; //style both legs 
							if(j > 0){
								flightChoiceNum = 'Conn.'; //after the first leg row, indicate that this is a connection
								if(props.flights[flightIndex].slice[0].segment.length === (j-1)){
									trClass += 'bottom-border'; //if the last leg add a border
								}
							}else{
								trClass += ' top-border'; //first leg
							}
						}else{
							trClass += ' top-border bottom-border'; //single leg flights
						}
						if(flightIndex === props.selectedFlight){
							trClass += ' selected-flight';
						}

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
			<tbody className="flight-options">
				{tableBody}
			</tbody>	
		</table>
	);
}

export default FlightResultsList;
