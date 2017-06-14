import React from 'react'

const Activity = (props) => {	
	let iconString = '';
	if(props.info.type === 'food'){
		iconString = 'fa fa-cutlery fa-2x';
	}else if(props.info.type === 'activity'){
		iconString = 'fa fa-map-marker fa-2x';
	}else if(props.info.type === 'lodging'){
    iconString = 'fa fa-bed fa-2x';
  }

	return (
		<div className={`pt-2 ${props.info.type}`}>
			<div className="timeline-block">
				<div className={`timeline-activity-marker ${props.info.type}`}>
     	 		<i className={iconString} aria-hidden="true"></i>
   	 		</div>
       	<div className="timeline-content">
          <ul className="list-inline">
       			<li className="activity-time">
       				{props.info.time}
       			</li>
       			<li className="activity-name">
       				{props.info.activity}
       			</li>
       		</ul>
       	</div>
    	</div>
		</div>

	)
}

export default Activity