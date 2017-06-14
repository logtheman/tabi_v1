import React from 'react'
import * as api from '../../utils/utils'
import {
  Link
} from 'react-router-dom';


export default class MainPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			newTrip: false,
			date: api.getDate()
		}

		this.handleNewTrip = this.handleNewTrip.bind(this);
	}

	handleNewTrip(){
		this.setState({newTrip: !this.state.newTrip});
		// console.log("date: ", api.getDate());
	}

	render(){
		const selectionButtons = (
			<div className="container pt-3">
			  <div className="center-block button-container">
			    <div className="open-buttons ">
			      <button type="button" onClick={this.handleNewTrip} className="btn btn-outline-primary btn-block mt-4">Plan a trip</button>
			      <button type="button" className="btn btn-outline-success btn-block mt-3">Edit exiting trip</button>
			      <button type="button" className="btn btn-outline-danger btn-block mt-3">Explore Trips</button>
			    </div>    
			  </div>

			</div> 
		);

		const dateRange = (
      <div className="container trip-dates mt-5">
        <div className="center-block">
         	<form className="center-block">
         		<div className="row">
	         			<div className="col-6">
	     						<label className="text-shadow" htmlFor="tripStart">Start Date</label>
	         		  </div>
	         		  <div className="col-6">
	     						<label className="text-shadow" htmlFor="tripEnd">End Date</label>
	           	  </div>
	           </div>
         		<div className="row">
	         			<div className="col-6">
	     						<label className="sr-only" htmlFor="tripStart">Start Date</label>
	         		  	<input type="date" className="form-control travel-date-inputs"  id="tripStart"  placeholder="Start Date"/>
	         		  </div>
	         		  <div className="col-6">
	     						<label className="sr-only" htmlFor="tripEnd">End Date</label>
	           	  	<input type="date" className="form-control travel-date-inputs" id="tripEnd"  placeholder="Choose a Date" />
	           	  </div>
	           </div>
	           	<div className="row mt-1	">
	           	  <div className="col-md-6 offset-md-3">
	           	  	<Link to="/day_view" >
	           	  		<button type="button" className="btn btn-outline-primary btn-block start-trip-button ">Plan Trip!</button>
	           	 		</Link>
	           	 	</div>
	           	</div>
           	 
		       </form>

         	</div> 
       </div> //end of container
		);

		const showOptions = this.state.newTrip ? dateRange : selectionButtons;

		return (
			  <div className="banner text-center mb-3">
				  <div className="pt-4 text-shadow">
				    <h1 className="display-1"><strong>Tabi</strong></h1>
				    <h3 className="mt-3 text-shadow">Plan Your Journey</h3>
				  </div>
				  	{showOptions}

			  </div>

		);
	}

}