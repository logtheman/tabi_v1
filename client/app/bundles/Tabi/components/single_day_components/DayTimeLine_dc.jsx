import React from "react";
import Milestone from "./Milestone_dc";

const spacingMultiplier = 15;

const DayTimeLine = props => {
	//return all on the timeline activities to be listed after the day long activities
	const lodging = props.dayInfo.filter(act => { return (act.type === 'lodging') })
		.map((act, i) => {
			return (
				<div
					key={act.ID}
					onMouseEnter={() => props.handleMouseEnterMilestone(act.ID)}
					onMouseLeave={props.handleMouseLeaveMilestone}
				>
					<Milestone info={act} />
				</div>
			);
		});
	const lodgingRow = lodging ? lodging : 
		(<div key="na-lodging">
				<Milestone info={{type: "lodging"}} > N/A - no booking planned yet </Milestone>
			</div>);


	let dayTimeline = props.dayInfo.map((act, i) => {
		let space = i > 0
			? (act.startTimeNum - props.dayInfo[i - 1].endTimeNum) * spacingMultiplier
			: 0; //find difference in hours between activities and add space after the first Milestone
		if (i !== 0) {
			return (
				<div
					key={act.ID}
					onMouseEnter={() => props.handleMouseEnterMilestone(act.ID)}
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
				<h3 className="">Lodging</h3>
			</div>
			<div className="timeline">
				{lodgingRow}
			</div>
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