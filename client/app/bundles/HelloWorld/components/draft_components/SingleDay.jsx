import React from 'react'
import NavBanner from './NavBanner'
import LodgingRow from './LodgingRow'
import DayHeader from './DayHeader'
import DayTimeLine from './DayTimeLine'
import MapContainer from './MapContainer'
import BootstrapModal from './BootstrapModal'
import PlannerForm from './PlannerForm'
import AddActivity from './AddActivity'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { StickyContainer, Sticky } from 'react-sticky'
import FAKEDATA from './fake_data/day_data'



export default class SingleDay extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dayNum: 1, //placeholder
			showAddActivity: '',
			activeActivityIndex: null, 
			modalTitle: "What would you like to plan?"
		}

		this.handleChangeDay = this.handleChangeDay.bind(this); 
		this.handleAddActivity = this.handleAddActivity.bind(this);
		this.handleModalHeaderChange = this.handleModalHeaderChange.bind(this);
		this.handleMouseEnterActivity = this.handleMouseEnterActivity.bind(this);
		this.handleMouseLeaveActivity = this.handleMouseLeaveActivity.bind(this);

	}

	handleChangeDay(dayChange){
		//TODO: ADD IN CHECK FOR TRIP LENGTH
		this.setState({dayNum: this.state.dayNum + dayChange});
	}

	handleAddActivity(type, title){
		this.setState({showAddActivity: type});
		this.setState({modalTitle: title});		
	}

	handleModalHeaderChange(newHeader){
		this.setState({modalTitle: newHeader});
	}

	handleMouseEnterActivity(index){
		this.setState({activeActivityIndex: index});
		console.log("enter index: ", index);
	}
	handleMouseLeaveActivity(){
		console.log("Leave index: ", this.state.activeActivityIndex);
		this.setState({activeActivityIndex: null});
	}



	render(){
		
		const displayModal = this.state.showAddActivity ?
					(<BootstrapModal 
							onClose={this.handleAddActivity} 
							title={this.state.modalTitle}
							>
						<PlannerForm 
							titleChange={this.handleModalHeaderChange} 
							type={this.state.showAddActivity}
							/>
					</BootstrapModal>) : null;

		return (
			<div>
				<StickyContainer >
					{displayModal}
					<div className="row navbar-padding">
						<NavBanner />
					</div>
					<div className="row">
						<div className="col-md-7">
							<div className="single-day-container">
								<DayHeader dayNum={this.state.dayNum} handleChangeDay={this.handleChangeDay}/>
								<div className="ml-1">
									<LodgingRow lodgingInfo={FAKEDATA[this.state.dayNum-1][0]}/>
									<DayTimeLine 
										dayInfo={FAKEDATA[this.state.dayNum-1]}
										handleAddActivity = {this.handleAddActivity}
										handleMouseEnterActivity = {this.handleMouseEnterActivity}
										handleMouseLeaveActivity = {this.handleMouseLeaveActivity}

										/>
								</div>
							</div>
						</div>
						<div className="col-md-5 map-column">
							<div className="align-center">
								<AddActivity viewType="singleDay" handleAddActivity={this.handleAddActivity}/>
							</div>
							<MapContainer 
								locations={FAKEDATA[this.state.dayNum-1]}
								activeLocation={this.state.activeActivityIndex}
								/>
						</div>
					</div>
				</StickyContainer>
			</div>
		);
	}
}
