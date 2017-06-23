import React from "react";

const DayHeader = props => {
	let previousDayButton = "    ";
	if (props.dayNum > 1) {
		previousDayButton = (
			<span
				className="fa-lg pl-4 icon"
				onClick={() => props.handleChangeDay(-1)}
			>
				<i className="fa fa-arrow-left" aria-hidden="true" />
			</span>
		);
	}
	return (
		<div className="row day-header pt-3">
			<div className="col-2 change-day">
				{previousDayButton}
			</div>
			<div className="col-6 offset-2 pb-2">
				Day {props.dayNum} - 5/18/17{" "}
			</div>
			<div className="col-2 change-day">
				<span
					className="fa-lg pull-right pr-4 icon"
					onClick={() => props.handleChangeDay(1)}
				>
					{" "}<i className="fa fa-arrow-right" aria-hidden="true" />
				</span>
			</div>

		</div>
	);
};

export default DayHeader;