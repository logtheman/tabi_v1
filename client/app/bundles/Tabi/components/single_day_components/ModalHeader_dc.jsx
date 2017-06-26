import React from "react";

const ModalHeader = props => {
	let headerContent = "";

	switch (props.type) {
		case 'new trip':
			headerContent = (
					<div className="newTripHeader mt-1">
						<div className="pull-right">
							<button className="close-button" onClick={() => props.onClose("")}>
								<i className="fa fa-times" aria-hidden="true" />
							</button>
						</div>
						<h2>{props.children}</h2>
					</div>
			);
			break;
		default:
			headerContent = (
				<div>
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
				</div>
			);
	}

	return (
		<div>
			{headerContent}
		</div>
	);
};

export default ModalHeader;