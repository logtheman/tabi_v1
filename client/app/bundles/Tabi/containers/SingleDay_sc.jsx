//External libraries
import React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

//Dumb Components
import NavBanner from "../components/single_day_components/NavBanner_dc";
import LodgingRow from "../components/single_day_components/LodgingRow_dc";
import DayHeader from "../components/single_day_components/DayHeader_dc";
import DayTimeLine from "../components/single_day_components/DayTimeLine_dc";
import BootstrapModal from "../components/single_day_components/BootstrapModal_dc";
import AddMilestone from "../components/single_day_components/AddMilestone_dc";

//Containers
import PlannerForm from "./PlannerForm_sc";
import SimpleMap from "./SimpleMap_sc";

import FAKEDATA from "../fake_data/day_data";

export default class SingleDay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dayNum: 1, //placeholder
			showAddMilestone: "",
			activeMilestoneIndex: null,
			modalTitle: "What would you like to plan?"
		};
		document.body.style.overflowY = "scroll";

		this.handleChangeDay = this.handleChangeDay.bind(this);
		this.handleAddMilestone = this.handleAddMilestone.bind(this);
		this.handleModalHeaderChange = this.handleModalHeaderChange.bind(this);
		this.handleMouseEnterMilestone = this.handleMouseEnterMilestone.bind(this);
		this.handleMouseLeaveMilestone = this.handleMouseLeaveMilestone.bind(this);
	}

	handleChangeDay(dayChange) {
		//TODO: ADD IN CHECK FOR TRIP LENGTH
		this.setState({ dayNum: this.state.dayNum + dayChange });
	}

	handleAddMilestone(type, title) {
		this.setState({ showAddMilestone: type });
		this.setState({ modalTitle: title });
	}

	handleModalHeaderChange(newHeader) {
		this.setState({ modalTitle: newHeader });
	}

	handleMouseEnterMilestone(index) {
		this.setState({ activeMilestoneIndex: index });
	}
	handleMouseLeaveMilestone() {
		// this.setState({ activeActivityIndex: null });
	}

	render() {
		const center = {
			lat: FAKEDATA[this.state.dayNum - 1][0].lat,
			lng: FAKEDATA[this.state.dayNum - 1][0].lng
		};

		const displayModal = this.state.showAddMilestone
			? <BootstrapModal
					onClose={this.handleAddMilestone}
					title={this.state.modalTitle}
				>
					<PlannerForm
						titleChange={this.handleModalHeaderChange}
						type={this.state.showAddMilestone}
						onClose={this.handleAddMilestone}
					/>
				</BootstrapModal>
			: null;

		return (
			<div>
				{displayModal}
				<div className="row navbar-padding">
					<NavBanner />
				</div>
				<div className="row">
					<div className="col-md-7">
						<div className="single-day-container">
							<DayHeader
								dayNum={this.state.dayNum}
								handleChangeDay={this.handleChangeDay}
							/>
							<div className="ml-1">
								<DayTimeLine
									dayInfo={FAKEDATA[this.state.dayNum - 1]}
									handleAddMilestone={this.handleAddMilestone}
									handleMouseEnterMilestone={this.handleMouseEnterMilestone}
									handleMouseLeaveMilestone={this.handleMouseLeaveMilestone}
								/>
							</div>
						</div>
					</div>
					<div className="col-md-5 map-column">
						<div className="align-center">
							<AddMilestone
								viewType="singleDay"
								handleAddMilestone={this.handleAddMilestone}
							/>
						</div>
						<div className="single-day-map">
							<SimpleMap
								locations={FAKEDATA[this.state.dayNum - 1]}
								activeLocation={this.state.activeMilestoneIndex}
								center={center}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// <LodgingRow lodgingInfo={FAKEDATA[this.state.dayNum - 1][0]} />
