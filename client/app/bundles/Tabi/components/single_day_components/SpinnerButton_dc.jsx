import React from 'react'

const SpinnerButton = (props) => {

	const button = props.loading ? (
			<button type="submit" className="btn btn-primary mr-3" disabled> 
				<i className="fa fa-refresh fa-spin" ></i>{' '}Loading Results
			</button>
		): 
		(<button type="submit" className="btn btn-primary mr-3" onClick={props.handleFlightQuery}> 
			{'  '}{props.children}
		</button>);

	return(
		<div>
			{button}
		</div>
	);
}

export default SpinnerButton;