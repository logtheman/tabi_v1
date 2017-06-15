import React from 'react'
import { Radio, FormGroup, Button } from 'react-bootstrap'
import LodgingForm from './LodgingForm_sc'
import FoodForm from './FoodForm_sc'



export default class PlannerForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showOptions: true,
			formType: props.type,
			subType: '', //for secondary filtering question
		}
	}

	handleTypeSelect(type){
		this.setState({formType: type});
	}

	handleSubTypeSelect(type){
		this.setState({subType: type});
		this.setState({showOptions: false});
		this.props.titleChange(`${type} Information`);
	}

	render(){

		let subTypeContent = ''; 
		let formContent = '';
		switch(this.state.formType){
			case 'lodging':
				if(this.state.subType){
					formContent = (
						<LodgingForm 
							onClose={this.props.onClose}
							lodgingType={this.state.subType}
						/>);
				}else{
					subTypeContent = 
						(<div className="text-center mt-3">
				      <button className="btn btn-outline-info mr-2" onClick={() => this.handleSubTypeSelect('Hotel')}>
				        <i className="fa fa-h-square fa-2x pr-2" aria-hidden="true"></i>
				        Hotel
				      </button>
				      {' '}
				      <button className="btn btn-outline-info mr-2" onClick={() => this.handleSubTypeSelect('AirBnB')}>
				        <i className="fa fa-home fa-2x pr-2" aria-hidden="true"></i>
				        AirBnB
				      </button>
				      {' '}
				      <button className="btn btn-outline-info mr-2" onClick={() => this.handleSubTypeSelect('Other Lodging')}>
				        <i className="fa fa-question fa-2x pr-2" aria-hidden="true"></i>
				        Other
				      </button>
						 </div>);
				}
				break;
			case 'food':
				if(this.state.subType){
					formContent = (
						<FoodForm 
							onClose={this.props.onClose}
							foodType={this.state.subType}
						/>);
				}else{
					subTypeContent = 
						(<div className="text-center mt-3">
				      <button className="btn btn-outline-success mr-2" onClick={() => this.handleSubTypeSelect('Restaurant')}>
				        <i className="fa fa-cutlery fa-2x pr-2" aria-hidden="true"></i>
				        Restaurant
				      </button>
				      {' '}
				      <button className="btn btn-outline-success mr-2" onClick={() => this.handleSubTypeSelect('Other Meal ')}>
				        <i className="fa fa-question fa-2x pr-2" aria-hidden="true"></i>
				        Other
				      </button>

						 </div>);
				}
				break;
			default:
		}





		return (
			<div className="pb-2">

				{subTypeContent}
				<br />
				{formContent}

			</div>
		);
	}

}