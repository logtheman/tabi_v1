import React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import Milestone from "./Milestone_dc";
import Transportation from "./Transportation_dc";
import AddTransportationRow from "./AddTransportationRow_dc";



const spacingMultiplier = 20;

const DayTimeLine = props => {

	//return all on the timeline activities to be listed after the day long activities
	const lodging = props.dayInfo.filter(act => { return (act.type === 'lodging') })
		.map((act, i) => {
			let rowHeight = 73; //default height
			let showDetail = false;
			if(props.selectedRow === act.id){
				rowHeight = 'auto';
				showDetail = true;
			}  
			return (
				<div
					key={act.id}
					onMouseEnter={() => props.handleMouseEnterMilestone(act.id)}
					onMouseLeave={props.handleMouseLeaveMilestone}
					onClick={() => props.handleSelectMilestone(act.id)}
				>
					<Milestone info={act} height={rowHeight} showDetail={showDetail}/>
				</div>
			);
		});
	const lodgingRow = lodging ? lodging : 
		(<div key="na-lodging">
				<Milestone info={{type: "lodging"}} > N/A - no booking planned yet </Milestone>
			</div>);

	const nonLodging = props.dayInfo.filter(act => { return (act.type !== 'lodging') });
	let dayTimeline = nonLodging.map((act, i) => {
			let space = (i < nonLodging.length-1)
			? (nonLodging[i + 1].startTimeNum - act.endTimeNum) * spacingMultiplier
			: 0; //find difference in hours between activities and add space after the first Milestone
			let rowHeight = 73; //default height
			let showDetail = false;
			if(props.selectedRow === act.id){
				rowHeight = 'auto';
				showDetail = true;
			}  

			// must be > 1 element && > 1 remaining  && the element before && after are not transportation
			const spacerOrAddTrans = (nonLodging[i + 1] && nonLodging[i] &&
				nonLodging[i + 1].type !== 'transportation' && nonLodging[i].type !== 'transportation') ?
				(<AddTransportationRow />) 
				: (<div style={{ height: space + "px" }} />);

			const timelineComponent = (act.type === 'transportation') ? (
				<div>
					<div id={`TA${act.id}`} onClick={() => props.handleAddTransportation(act.id)}>
						<Transportation info={act} />
					</div>
					<div style={{ height: space + "px" }} />
				</div>
				) :
				(
					<div>
						<div
						onMouseEnter={() => props.handleMouseEnterMilestone(act.id)}
						onMouseLeave={props.handleMouseLeaveMilestone}
						onClick={() => props.handleSelectMilestone(act.id)}
					>
						<Milestone info={act} height={rowHeight} showDetail={showDetail}/>
						</div>
					{spacerOrAddTrans}
				</div>);

			return (
				<div key={act.id}>
					{timelineComponent}
				</div>
			);
	});

	return (
		<CSSTransitionGroup
		  transitionName="activityRow"
		  component="div"
		  transitionEnterTimeout={500}
		  transitionLeaveTimeout={300}
		  transitionAppear={true}
		  transitionAppearTimeout={500}>
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
		</CSSTransitionGroup>
	);
};

export default DayTimeLine;