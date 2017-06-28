import React from 'react'


const MilestoneDetailRow = (props) => {

	return(
		<div>
		<ul className="list-inline">
		  <li className="activity-time">
		    {props.info.time}
		    {props.additionalTimeInfo}
		  </li>
		  <li className="activity-name">
		    {props.info.description}
		    <br />
		    {props.children}
		    <br />
		    {props.info.location}
		    <br />
		    {props.info.notes}
		    <br />
		    {props.info.duration}
		  </li>
		</ul>
		</div>
	);
}

export default MilestoneDetailRow;