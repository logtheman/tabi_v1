import React from 'react'
import Activity from './Activity'
import AddActivity from './AddActivity'



const spacingMultiplier = 10;

const DayTimeLine = (props) => {

	//return all on the timeline activities to be listed after the day long activities
	let dayTimeline = props.dayInfo.filter(act => { return (act.allDay === false) })
		.map((act, i) => {
			let space = i >0 ? (act.startTime - props.dayInfo[i-1].endTime) * spacingMultiplier : 0; //find difference in hours between activities and add space after the first activity
			return (
				<div key={i}>
					<div style={{height: space + 'px'}}></div>
					<Activity info = {act} />
					
				</div>
			)
	});




	return (
		<div>
			<div className="timeline-header">
				<h3 className="">Planned Milestones</h3>
			</div>
			<AddActivity viewType="singleDay" handleAddActivity={props.handleAddActivity}/>
			<div className="timeline">
				{dayTimeline}
			</div>
		</div>
	)
}

export default DayTimeLine

