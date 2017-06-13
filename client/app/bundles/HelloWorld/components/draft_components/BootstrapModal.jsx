import React from 'react'
import { Button, Modal } from 'react-bootstrap';


const BootstrapModal = (props) => {

	return (
		<div className="static-modal" >
		  <Modal.Dialog className="mt-3">
		    <Modal.Header className="pt-3">
		      <Modal.Title>{props.title}</Modal.Title>
		    </Modal.Header>

		    <Modal.Body>
		    	{props.children}
		    </Modal.Body>

		    <Modal.Footer>
		      <Button onClick={() => props.onClose('')}>Close</Button>
		      <Button bsStyle="primary">Save changes</Button>
		    </Modal.Footer>

		  </Modal.Dialog>
		</div>
	);
}

export default BootstrapModal;