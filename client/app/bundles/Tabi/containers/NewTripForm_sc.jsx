import React from 'react'
import { Modal } from 'react-bootstrap';

import Geosuggest from 'react-geosuggest';
import SimpleMap from './SimpleMap_sc'
import * as api from '../../utils/utils'


// const LodgingForm = (props) =>{
export default class FlightForm extends React.Component{
		constructor(props){
			super(props);
			this.state = {
				address: null,
				center: null,
				QPXURL: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCn-htcBCbG-7-a5NLKCY8ElUV7WGziTlU',
				searchResults: '',
			}
			this.handleFlightQuery = this.handleFlightQuery.bind(this);
		}


		onSuggestSelect(suggest) {

		}	



		handleFlightQuery(e, origin, departureDate, destination, returnDate){
			e.preventDefault();
			const flightData = {
			  "request": {
			    "passengers": {
			      "adultCount": 1
			    },
			    "slice": [
			      {
			        "origin": origin,
			        "destination": destination,
			        "date": departureDate
			      },
			      {
			        "origin": destination,
			        "destination": origin,
			        "date": returnDate
			      }
			    ],
			    "solutions": 20,
			    "refundable": false
			  }
			};
			const response = api.post(this.state.QPXURL, flightData, '', 'internal')
			.then(json=>{
				console.log(json);
				this.setState({searchResults: json});

			});
		}

		render(){

			let nameType = '';
			let addressInput = '';
			console.log(this.props);

			switch (this.props.activityType){
				case '':
					nameType = 'Activity';
					addressInput = (<div className="highlight">{this.state.address}</div>);
					break;

				default:
					nameType = '';
				  addressInput = (<input type="text" className="form-control" id="address" placeholder="" />);
			}

			let results = '';
			if (this.state.searchResults){
				let flightOptions = this.state.searchResults.trips.tripOption.map((n, i) => {
					return (
						<tr key={i}>
							<td>{'#'}{i}</td>
							<td>{n.slice[0].segment[0].leg[0].operatingDisclosure}</td>
							<td>{n.slice[0].segment[0].leg[0].origin}</td>
							<td>{api.getDateString(n.slice[0].segment[0].leg[0].departureTime)}</td>
							<td>{n.slice[0].segment[0].leg[0].destination}</td>
							<td>{api.getDateString(n.slice[0].segment[0].leg[0].arrivalTime)}</td>
						</tr>
					);

				});
				let tableBody = (<tbody>{flightOptions}</tbody>);
				results = (<table className="table table-striped">
										<thead>
											<tr>
												<th>Option:</th>
												<th>Carrier:</th>
												<th>From:</th>
												<th>Depature:</th>
												<th>To:</th>
												<th>Arrival:</th>
				  						</tr>
				  					</thead>
				  						{tableBody}

									</table>);
			}

		return(
			<div>
				<form onSubmit={() => this.handleFlightQuery(event, this.refs.origin.value, this.refs.departureDate.value, this.refs.destination.value, this.refs.returnDate.value)}>

				<div className="row">
					<div className="col-6">
						<div className="form-group">
						  <label htmlFor="origin">Depaturing from:</label>
						  <input type="text" className="form-control" id="origin" placeholder="i.e. SFO" ref="origin"/>
						</div>
					</div>
					<div className="col-6">
						<div className="form-group">
						  <label htmlFor="departureDate">Depature Date:</label>
						  <input type="date"  className="form-control" id="departureDate" placeholder="" ref="departureDate"/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<div className="form-group">
						  <label htmlFor="destination">Going to:</label>
						  <input type="text"  className="form-control" id="destination" placeholder="i.e. LAX" ref="destination"/>
						</div>
					</div>
					<div className="col-6">
						<div className="form-group">
						  <label htmlFor="returnDate">Return Date:</label>
						  <input type="date"  className="form-control" id="returnDate" placeholder="" ref="returnDate"/>
						</div>
					</div>
				</div>
				{ results }


	    	  <Modal.Footer>
	    		  <button type="submit" className="btn btn-primary mr-3">Submit</button>
	    		  <button type="close" className="btn btn-secondary" onClick={() => this.props.onClose('')}>Close</button>
	    	  </Modal.Footer>

				</form>
		  </div>
		)
	}
}

// export default LodgingForm