import React from 'react'
import NavBanner from './NavBanner'
import LodgingRow from './LodgingRow'
import DayHeader from './DayHeader'
import DayTimeLine from './DayTimeLine'
import MapContainer from './MapContainer'
import BootstrapModal from './BootstrapModal'
import PlannerForm from './PlannerForm'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { StickyContainer, Sticky } from 'react-sticky'
import FAKEDATA from './fake_data/day_data'



export default class SingleDay extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dayNum: 1, //placeholder
			showAddActivity: false,
			modalTitle: "What would you like to plan?"
		}

		this.handleChangeDay = this.handleChangeDay.bind(this); 
		this.handleAddActivity = this.handleAddActivity.bind(this);
		this.handleModalHeaderChange = this.handleModalHeaderChange.bind(this);
	}

	handleChangeDay(dayChange){
		//TODO: ADD IN CHECK FOR TRIP LENGTH
		this.setState({dayNum: this.state.dayNum + dayChange});
	}

	handleAddActivity(){
		this.setState({showAddActivity: !this.state.showAddActivity});	
	}

	handleModalHeaderChange(newHeader){
		this.setState({modalTitle: newHeader});
	}

	render(){
		
		const displayModal = this.state.showAddActivity ?
					(<BootstrapModal 
							onClose={this.handleAddActivity} 
							title={this.state.modalTitle}
							>
						<PlannerForm titleChange={this.handleModalHeaderChange} />
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
										/>
								</div>
							</div>
						</div>
						<div className="col-md-5 map-column">
							<MapContainer locations={FAKEDATA[this.state.dayNum-1]}/>
						</div>
					</div>
				</StickyContainer>
			</div>
		);
	}
}

 // <CSSTransitionGroup
//   transitionName="addActivity"
//   transitionEnterTimeout={300}
//   transitionLeaveTimeout={500} >

// </CSSTransitionGroup>

// <Modal 
// 	key="activityModal"
//  		show={this.state.showAddActivity}
//  	  onClose={this.handleAddActivity}
//  	  >
//  	  	<PlannerForm type="lodging" />
//  	</Modal>