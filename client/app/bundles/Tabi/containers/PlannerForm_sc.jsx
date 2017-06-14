import React from 'react'
import { Radio, FormGroup, Button } from 'react-bootstrap'
import LodgingForm from '../components/single_day_components/LodgingForm_dc'


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
					formContent = (<LodgingForm />);
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

				{subTypeContent}
				<br />
				{formContent}

			</div>
		);
	}

}