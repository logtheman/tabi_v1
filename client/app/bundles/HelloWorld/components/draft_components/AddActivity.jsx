import React from 'react'
import { Button } from 'react-bootstrap'

const AddAcivity = (props) => {

	return (
			<div className="add-activity-row text-center" >
				<div className={`${props.viewType}`} onClick={props.handleAddActivity}>
					<i className="fa fa-plus-square-o fa-3x add-activity-icon" aria-hidden="true"></i>
					<h4>Add Activity</h4>
				</div>
			</div>
		)
}

export default AddAcivity;