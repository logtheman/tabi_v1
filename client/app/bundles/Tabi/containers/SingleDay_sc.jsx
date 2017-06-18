//External libraries
import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

//Dumb Components
import NavBanner from '../components/single_day_components/NavBanner_dc'
import LodgingRow from '../components/single_day_components/LodgingRow_dc'
import DayHeader from '../components/single_day_components/DayHeader_dc'
import DayTimeLine from '../components/single_day_components/DayTimeLine_dc'
import BootstrapModal from '../components/single_day_components/BootstrapModal_dc'
import AddActivity from '../components/single_day_components/AddActivity_dc'

//Containers
import PlannerForm from './PlannerForm_sc'
import SimpleMap from './SimpleMap_sc'

import FAKEDATA from '../fake_data/day_data'


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
	}
	handleMouseLeaveActivity(){
		this.setState({activeActivityIndex: null});
	}



	render(){
		const center = {
			lat: FAKEDATA[this.state.dayNum-1][0].lat,
			lng: FAKEDATA[this.state.dayNum-1][0].lng
		}


		const displayModal = this.state.showAddActivity ?
					(<BootstrapModal 
							onClose={this.handleAddActivity} 
							title={this.state.modalTitle}
							>
						<PlannerForm 
							titleChange={this.handleModalHeaderChange} 
							type={this.state.showAddActivity}
							onClose={this.handleAddActivity}
							/>
					</BootstrapModal>) : null;

		return (
			<div>
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
							<div style={{height: "60%", marginTop: '10px', marginRight: '10px', marginLeft: '10px', border: '1px solid black', minHeight: '500px'}}>
								<SimpleMap 
								locations={FAKEDATA[this.state.dayNum-1]}
								activeLocation={this.state.activeActivityIndex}
								center={center}
								/>
							</div>
						</div>
					</div>
			</div>
		);
	}
}
