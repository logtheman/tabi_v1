import React from 'react'
import ReactTooltip from 'react-tooltip'

const AddAcivity = (props) => {

	return (
			<div className="add-activity-buttons text-center" >
				<div className={`${props.viewType}`} >
					<div className="text-center py-1">
						<h3><small className="text-muted">Add to Plan:</small> </h3>
			      <button data-for="lodging" data-tip="true" className="btn btn-outline-info mr-2" onClick={() => props.handleAddActivity('lodging', 'Type of Lodging:')} >
			        <i className="fa fa-bed fa-2x pr-2 add-activity-icon" aria-hidden="true"></i>
			        Lodging
			      </button>
			      <ReactTooltip id='lodging' type="dark" effect="solid" >
			      	<span>Add hotel, AirBnB or a friends address to your lodging plan!</span>
			      </ReactTooltip>

			      {' '}
			      <button data-for="food" data-tip="true" className="btn btn-outline-success mr-2" onClick={() => props.handleAddActivity('food', 'Type of meal plan:')}>
			        <i className="fa fa-cutlery fa-2x pr-2 add-activity-icon" aria-hidden="true"></i>
			        Food
			      </button>
			      <ReactTooltip id='food' type="dark" effect="solid" >
			      	<span>Plan a meal at a restaurant, go for drinks, <br />or general plan to eat around a certain time and place.</span>
			      </ReactTooltip>

			      {' '}
			      <button className="btn btn-outline-warning mr-2" >
			        <i className="fa fa-map-marker fa-2x pr-2 add-activity-icon" aria-hidden="true"></i>
			        Activity
			      </button>
					 </div>
				</div>
			</div>
		)
}

export default AddAcivity;

