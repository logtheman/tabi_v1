import React from 'react'
import { Button, FieldGroup, Checkbox, Radio, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';

const LodgingForm = (props) =>{

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
				    <label for="hotelName">Hotel Name</label>
				    <Geosuggest
				      placeholder="Start typing!"
				      inputClassName="form-control"
				      initialValue="NahaNa Hotel"
				      onSuggestSelect={onSuggestSelect}
				      location={new google.maps.LatLng(26.2144722, 127.6763)}
				      radius="20" />
				  </div>
				  <div className="form-group">
				    <label for="hotelAddress">Hotel Address</label>
				  </div>


				  <div className="form-group">
				    <label for="hotelURL">URL</label>
				    <input type="text" className="form-control" id="hotelURL" placeholder="i.e. http://www.marriott.com/hotels/" />
				  </div>
				</form>
		  <form>

		    <FieldGroup
		      id="formControlsText"
		      type="text"
		      label="Estimated Cost"
		      
		    />

		    <Checkbox checked readOnly>
		      Paid in Advance
		    </Checkbox>
		    <Radio checked readOnly>
		      Radio
		    </Radio>
		    <div className="row">
					<div className="col-3">
						<label className="sr-only" htmlFor="tripStart">Check-in Date</label>
				  	<input type="date" className="form-control travel-date-inputs"  id="tripStart" value="2017-05-19" placeholder="Start Date"/>
				  </div>
				  <div className="col-3">
						<label className="sr-only" htmlFor="tripEnd">Check-out Date</label>
		  	  	<input type="date" className="form-control travel-date-inputs" id="tripEnd" value="2017-05-30" placeholder="Choose a Date" />
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