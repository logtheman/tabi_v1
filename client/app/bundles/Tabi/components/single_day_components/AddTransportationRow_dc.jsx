import React from 'react'


const AddTransportationRow = (props) => {
	
	return (
		<div className="">
		  <div className="timeline-block">
		    <div className="transportation-row">
		      <div className="transportion-content">
			      <ul className="list-inline add-transportation">
			        <li className="list-inline-item">
		         		<i className="fa fa-plus fa-1x" aria-hidden="true" />
		         	</li>
		         	<li className="list-inline-item transportion-detail left-padding">
		         	  <b className="">Add Transportation</b>
		         	</li>
		        </ul>
		      </div>
		    </div>
		  </div>
		</div>

	);
}

export default AddTransportationRow;