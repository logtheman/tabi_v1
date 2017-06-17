import React from 'react'
import { Button, Modal } from 'react-bootstrap';


export default class BootstrapModal extends React.Component{

	render(){
		return (
			<div className="static-modal" >
			  <Modal.Dialog className="mt-3">
			    <Modal.Header className="pt-3 modal-header">
			      <Modal.Title>{this.props.title}</Modal.Title>
			      <Button onClick={() => this.props.onClose('')} bsStyle="danger">X</Button>
			    </Modal.Header>

			    <Modal.Body className="pt-0">
			    	{this.props.children}
			    </Modal.Body>

			    {this.props.footer}

			  </Modal.Dialog>
			</div>
		);

	}
}

// export default BootstrapModal;