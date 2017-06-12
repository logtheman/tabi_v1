import React from 'react'
import { Radio, FormGroup, Button } from 'react-bootstrap'
import LodgingForm from './lodging_form'


export default class PlannerForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showOptions: true,
			formType: '',
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
		let formOptions = 
			(<div className="text-center">
		      <button className="btn btn-outline-info mr-2" onClick={() => this.handleTypeSelect('lodging')}>
		        <i className="fa fa-bed fa-2x pr-2" aria-hidden="true"></i>
		        Lodging
		      </button>
		      {' '}
		      <button className="btn btn-outline-success mr-2" onClick={() => this.handleTypeSelect('food')}>
		        <i className="fa fa-cutlery fa-2x pr-2" aria-hidden="true"></i>
		        Food
		      </button>
		      {' '}
		      <button className="btn btn-outline-warning mr-2" onClick={() => this.handleTypeSelect('activity')}>
		        <i className="fa fa-map-marker fa-2x pr-2" aria-hidden="true"></i>
		        Activity
		      </button>
				 </div>);


		let subTypeContent = ''; 
		let formContent = '';
		switch(this.state.formType){
			case 'lodging':
				if(this.state.subType){
					formContent = (<LodgingForm />);
					formOptions = '';
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
				      <button className="btn btn-outline-info mr-2" onClick={() => this.handleSubTypeSelect('Other')}>
				        <i className="fa fa-question fa-2x pr-2" aria-hidden="true"></i>
				        Other
				      </button>
						 </div>);
				}
				break;
			case 'food':
				// formContent = (<LodgingForm />);
				break;
			default:
		}





		return (
			<div className="pb-2">
				{formOptions}

				{subTypeContent}
				<br />
				{formContent}

			</div>
		);
	}

}