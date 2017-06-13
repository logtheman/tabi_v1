import React from 'react'

const AddAcivity = (props) => {

	return (
			<div className="add-activity-buttons text-center" >
				<div className={`${props.viewType}`} >
					<div className="text-center py-1">
						<h4>Add: </h4>
			      <button className="btn btn-outline-info mr-2" onClick={() => props.handleAddActivity('lodging', 'Type of Lodging:')} >
			        <i className="fa fa-bed fa-2x pr-2 add-activity-icon" aria-hidden="true"></i>
			        Lodging
			      </button>
			      {' '}
			      <button className="btn btn-outline-success mr-2" >
			        <i className="fa fa-cutlery fa-2x pr-2 add-activity-icon" aria-hidden="true"></i>
			        Food
			      </button>
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

