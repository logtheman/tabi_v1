import React from 'react'
import { Button, FieldGroup, Checkbox, Radio, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


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

		return(
			<div>
				<form>
				  <div className="form-group">
				    <label for="hotelName">Hotel Name</label>
				    <input type="text" className="form-control" id="hotelName" placeholder="i.e. Marriot" />
				  </div>
				  <div className="form-group">
				    <label for="hotelAddress">Hotel Address</label>
				    <input type="text" className="form-control" id="hotelAddress" placeholder="i.e. 780 Mission St, San Francisco, CA 94103" />
				  </div>
				  <div className="form-group">
				    <label for="hotelURL">URL</label>
				    <input type="text" className="form-control" id="hotelURL" placeholder="i.e. http://www.marriott.com/hotels/" />
				  </div>
				</form>
		  <form>

		    <FieldGroup
		      id="formControlsText"
		      label="Hotel URL"
		      type="text"
		    />
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
				<div className="col-6">
					<label className="sr-only" htmlFor="tripStart">Check-in Date</label>
			  	<input type="date" className="form-control travel-date-inputs"  id="tripStart" value="2017-05-19" placeholder="Start Date"/>
			  </div>
			  <div className="col-6">
					<label className="sr-only" htmlFor="tripEnd">Check-out Date</label>
	  	  	<input type="date" className="form-control travel-date-inputs" id="tripEnd" value="2017-05-30" placeholder="Choose a Date" />
	  	  </div>


		    <Button type="submit">
		      Submit
		    </Button>
		  </form>
		  </div>
		)
}

export default LodgingForm