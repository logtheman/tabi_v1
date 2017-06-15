import React from 'react'
import { Button, FieldGroup, Checkbox, Radio, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';

const LodgingForm = (props) =>{
		let address = '';
		function FieldGroup({ id, label, help, ...props }) {
		  return (
		    <FormGroup controlId={id}>
		      <ControlLabel className="label">{label}</ControlLabel>
		      <FormControl {...props} />
		      {help && <HelpBlock>{help}</HelpBlock>}
		    </FormGroup>
		  );
		}

		function onSuggestSelect(suggest) {
		  console.log(suggest);
		}

				    // <input type="text" className="form-control" id="hotelName" placeholder="i.e. Marriot" />


		return(
			<div>
				<form>
				  <div className="form-group">
				    <label htmlFor="hotelName">Hotel Name</label>
				    <Geosuggest
				      placeholder="Start typing!"
				      inputClassName="form-control"
				      initialValue="NahaNa Hotel"
				      onSuggestSelect={onSuggestSelect}
				      location={new google.maps.LatLng(26.2144722, 127.6763)}
				      radius="20" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="address">Hotel Address</label>
				    {address}
				  </div>


				  <div className="form-group">
				    <label htmlFor="hotelURL">URL</label>
				    <input type="text" className="form-control" id="hotelURL" placeholder="i.e. http://www.marriott.com/hotels/" />
				  </div>

	  	    <div className="row mb-2">
	  				<div className="col-3">
	  					<label className="sr-only" htmlFor="tripStart">Check-in Date:</label>
	  			  	<input type="date" className="form-control travel-date-inputs"  id="tripStart" placeholder="Start Date"/>
	  			  </div>
	  			  <div className="col-3 ">
	  					<label className="sr-only" htmlFor="tripEnd">Check-out Date:</label>
	  	  	  	<input type="date" className="form-control travel-date-inputs" id="tripEnd" placeholder="Choose a Date" />
	  	  	  </div>
	    	  </div>
	    	  <div className="row">
	    	  	<div className="col-3 form-group">
	    	  		<label htmlFor="estimatedCost" className="">Estimated Cost:</label>
	    	  		 <input className="form-control" type="text" id="estimatedCost"/>
		    	  </div>
      	  	<div className="col-3 form-group">
	      	  		<label className="custom-control custom-checkbox"> Paid in advance</label>
	      	  	  <input type="checkbox" className="custom-control-input" />
	      	  	  <span className="custom-control-indicator"></span>
	      	  	
  	    	  </div>
	    	  </div>
	    	  <Button type="submit">
	    	    Submit
	    	  </Button>
				</form>
		  </div>
		)
}

export default LodgingForm