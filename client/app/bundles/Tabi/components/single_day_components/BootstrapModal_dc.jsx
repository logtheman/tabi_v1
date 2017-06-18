import React from 'react'
import { Button, Modal } from 'react-bootstrap';


const BootstrapModal = (props) => {

	const styles = {
		marginTop: props.topMargin,
	}


	return (
		<div className="static-modal" >
		  <Modal.Dialog className="" style={styles} >
		  	<div className="pull-right">
				  <button className="close-button" onClick={() => props.onClose('')} >
				  	<i className="fa fa-times" aria-hidden="true"></i>
				  </button>
			  </div>
			  <Modal.Header className="modal-header">
			  	<div className="col-2"></div>
			    <div className="col-8  text-center">
			      <Modal.Title className="">{props.title}</Modal.Title>
			    </div>
			    <div className="col-2"></div>
		    </Modal.Header>

		    <Modal.Body className="pt-2">
		    	{props.children}
		    </Modal.Body>

		    {props.footer}

		  </Modal.Dialog>
		</div>
	);
}

export default BootstrapModal;