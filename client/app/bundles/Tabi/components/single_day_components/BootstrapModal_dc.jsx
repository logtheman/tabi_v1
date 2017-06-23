import React from "react";
import { Button, Modal } from "react-bootstrap";

const BootstrapModal = props => {
	const styles = {
		marginTop: props.topMargin,
		maxWidth: props.maxWidth,
	};

	const backdropStyle = props.backdrop
		? "static-modal backdrop"
		: "static-modal";

	return (
		<div className={backdropStyle}>
			<Modal.Dialog className="large" style={styles}>
				<div className="pull-right">
					<button className="close-button" onClick={() => props.onClose("")}>
						<i className="fa fa-times" aria-hidden="true" />
					</button>
				</div>
				<Modal.Header className="modal-header">
					<div className="col-2" />
					<div className="col-8  text-center">
						<Modal.Title className="h2">{props.title}</Modal.Title>
					</div>
					<div className="col-2" />
				</Modal.Header>

				<Modal.Body className="pt-2">
					{props.children}
				</Modal.Body>

				{props.footer}

			</Modal.Dialog>
		</div>
	);
};

export default BootstrapModal;