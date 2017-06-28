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
		  </li>
		 	<li className="activity-name">
			  <b>Duration: </b>{props.info.duration}		    
		 	</li>
	 	 	<li className="activity-name">
	 		  <b>Address: </b>{props.info.location}	    
	 	 	</li>
 	 	 	<li className="activity-name">
 	 		  <b>Notes: </b>{props.info.notes}	    
 	 	 	</li>

		  {props.children}
		</ul>
		</div>
	);
}

export default MilestoneDetailRow;