import React from 'react'
import { Radio, FormGroup, Button } from 'react-bootstrap'
import LodgingForm from './lodging_form'


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
		console.log("subType: ", this.state.subType);

		let subTypeContent = ''; 
		let formContent = '';
		switch(this.state.formType){
			case 'lodging':
				if(this.state.subType){
					console.log("onClose: ", this.props.onClose);

					formContent = (
						<LodgingForm 
							onClose={this.props.onClose}
							lodgingType={this.state.subtype}
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
				{formContent}

			</div>
		);
	}

}