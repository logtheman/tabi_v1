import React from 'react'
import NavBanner from './NavBanner_dc'


export default class DayView extends React.Component{

	render(){
		return(
				<div>
						<NavBanner />
			        <div className="container days-container">
			          <div className="row">
			            <div className="col-md-4 ">
			              <div className="day-container container">
			               <div className="row">
			                  <div className="col-md-12 lodging">Lodging: AirBnB - 655 Sutter St. </div>
			                  <div className="col-md-12 activity">12pm - Activity: National Art Museum </div>
			                  <div className="col-md-12 unplanned"><br/><br /> </div>
			                  <div className="col-md-12 unplanned"><br/><br /> </div>
			                  <div className="col-md-12 food">7pm - Food: Benu Reservations </div>
			                </div>
			              </div>
			              Day 1 - <i> 5/1/17</i>
			            </div>
			            <div className="col-md-4">
			              <div className="day-container container">
			               <div className="row">
			                  <div className="col-md-12 lodging">Lodging: AirBnB - 655 Sutter St. </div>
			                  <div className="col-md-12 activity">7am - Activity: Yoga @ Studio 6 </div>
			                  <div className="col-md-12 unplanned">4pm - Unplanned </div> -->
			                  <div className="col-md-12 unplanned"><br/><br /> </div>
			                  <div className="col-md-12 food">12pm - Food: street food </div>
			                </div>
			              </div>
			             </div>
		             </div>
		            </div>

		    </div>

		);
	}
}