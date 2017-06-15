import React from 'react'
import { Button, Modal } from 'react-bootstrap';


const BootstrapModal = (props) => {

	return (
		<div className="static-modal" >
		  <Modal.Dialog className="mt-3">
		    <Modal.Header className="pt-3 modal-header">
		      <Modal.Title>{props.title}</Modal.Title>
		      <Button onClick={() => props.onClose('')} bsStyle="danger">X</Button>
		    </Modal.Header>

		    <Modal.Body className="pt-0">
		    	{props.children}
		    </Modal.Body>



		  </Modal.Dialog>
		</div>
	);
}

export default BootstrapModal;