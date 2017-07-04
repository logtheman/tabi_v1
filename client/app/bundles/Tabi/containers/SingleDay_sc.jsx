//External libraries
import React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import _ from 'lodash'

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
import AddTransportationContainer from "./AddTransportationContainer_sc";

import * as api from "../../utils/utils";
import FAKEDATA from "../fake_data/day_data";

class SingleDay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dayNum: 1, //placeholder
			showAddMilestone: "",
			activeMilestoneIndex: null,
			openMilestoneIndex: null,
			addTransportationIndex: null,
			addTransportationPosition: {
				top: "300px",
				left: "100px",
			},
			modalTitle: "What would you like to plan?",
			mapColumnOffset: "0px",
		};
		document.body.style.overflowY = "scroll";

		this.handleChangeDay = this.handleChangeDay.bind(this);
		this.handleAddMilestone = this.handleAddMilestone.bind(this);
		this.handleModalHeaderChange = this.handleModalHeaderChange.bind(this);
		this.handleMouseEnterMilestone = this.handleMouseEnterMilestone.bind(this);
		this.handleMouseLeaveMilestone = this.handleMouseLeaveMilestone.bind(this);
		this.handleSelectMilestone = this.handleSelectMilestone.bind(this);
		this.handleAddTransportation = this.handleAddTransportation.bind(this);
		this.handleRemoveTransportationContainer = this.handleRemoveTransportationContainer.bind(this);
		this.onScrollY = this.onScrollY.bind(this);
	}


	componentWillMount(){
		window.addEventListener('scroll', _.throttle(this.onScrollY, 500));

	}

	componentWillUnmount(){
		window.removeEventListener('scroll', _.throttle(this.onScrollY, 500));
	}

	onScrollY(){
		if(window.outerWidth >= 1085){ //break point for two columns at lg
			this.setState({mapColumnOffset: window.scrollY});
		}else{
			this.setState({mapColumnOffset: 0});

		}
	}

	handleChangeDay(dayChange) {
		//TODO: ADD IN CHECK FOR TRIP LENGTH
		this.setState({ dayNum: this.state.dayNum + dayChange });
	}

	handleAddTransportation(id) {
		this.setState({ addTransportationIndex: id });
	}

	handleRemoveTransportationContainer(e) {
  	this.setState({ addTransportationIndex: null });
  }

	handleSelectMilestone(id) {
		if (id === this.state.openMilestoneIndex) {
			this.setState({ openMilestoneIndex: null });
		} else {
			this.setState({
				openMilestoneIndex: id,
				activeMilestoneIndex: id
			});
		}
	}

	handleAddMilestone(type, title) {
		this.setState({ showAddMilestone: type });
		this.setState({ modalTitle: title });
	}

	handleModalHeaderChange(newHeader) {
		this.setState({ modalTitle: newHeader });
	}

	handleMouseEnterMilestone(index) {
		// this.setState({ activeMilestoneIndex: index });
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

		const transportationContainer = this.state.addTransportationIndex
			? <AddTransportationContainer 
				id = {this.state.addTransportationIndex}
				transportation= {FAKEDATA[this.state.dayNum - 1].filter(x => x.id === this.state.addTransportationIndex)[0]}
				handleRemoveTransportationContainer={this.handleRemoveTransportationContainer}
				/>
			: null;

		const mapHeight = (window.innerHeight - 190); //190 is the current height of the banner and button container

		return (
			<div>
				{displayModal}
				<div className="row navbar-padding">
					<NavBanner />
				</div>
				<CSSTransitionGroup
					transitionName="componentTransitionFade"
					component="div"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					transitionAppear={true}
					transitionAppearTimeout={1000}
				>
					<div className="row">
						<div className="col-lg-7">
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
										handleSelectMilestone={this.handleSelectMilestone}
										handleAddTransportation={this.handleAddTransportation}
										selectedRow={this.state.openMilestoneIndex}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-5 map-column" style={{marginTop: `${this.state.mapColumnOffset}px`}} >
							<div className="align-center">
								<AddMilestone
									viewType="singleDay"
									handleAddMilestone={this.handleAddMilestone}
								/>
							</div>
							<div className="single-day-map" style={{height: mapHeight}}> 
								<SimpleMap
									locations={FAKEDATA[this.state.dayNum - 1]}
									activeLocation={this.state.activeMilestoneIndex}
									center={center}
								/>
							</div>
						</div>
					</div>
				</CSSTransitionGroup>
				{transportationContainer}

			</div>
		);
	}
}

// const SingleDay = AnimatedWrapper(SingleDayComponent);
export default SingleDay;

// <LodgingRow lodgingInfo={FAKEDATA[this.state.dayNum - 1][0]} />