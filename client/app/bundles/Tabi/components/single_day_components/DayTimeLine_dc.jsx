import React from "react";
import Milestone from "./Milestone_dc";

const spacingMultiplier = 10;

const DayTimeLine = props => {
	//return all on the timeline activities to be listed after the day long activities
	// let dayTimeline = props.dayInfo.filter(act => { return (act.allDay === false) })
	// 	.map((act, i) => {

	let sortArray = [...props.dayInfo];
	console.log(sortArray);

	let dayTimeline = props.dayInfo.map((act, i) => {
		let space = i > 0
			? (act.startTime - props.dayInfo[i - 1].endTime) * spacingMultiplier
			: 0; //find difference in hours between activities and add space after the first Milestone
		if (i !== 0) {
			return (
				<div
					key={i}
					onMouseEnter={() => props.handleMouseEnterMilestone(i)}
					onMouseLeave={props.handleMouseLeaveMilestone}
				>

					<div style={{ height: space + "px" }} />
					<Milestone info={act} />

				</div>
			);
		}
	});

	return (
		<div>
			<div className="timeline-header">
				<h3 className="">Planned Milestones</h3>
			</div>
			<div className="timeline">
				{dayTimeline}
			</div>
		</div>
	);
};

export default DayTimeLine;