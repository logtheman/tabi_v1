import React from "react";

const LodgingRow = props => {
	return (
		<div>
			<div className="timeline-header">
				<h3 className="">Lodging</h3>
			</div>
			<div className="timeline">
				<div className="lodging  ">
					<div className="timeline-block pb-4">
						<div className="timeline-activity-marker lodging mb-2">
							<i className="fa fa-bed fa-2x " aria-hidden="true" />
						</div>
						<div className="timeline-content">
							<ul className="list-inline">
								<li className="activity-time">
									{props.lodgingInfo.length}
								</li>
								<li className="activity-name">
									{props.lodgingInfo.name}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LodgingRow;