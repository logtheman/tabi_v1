import React from "react";
import AnimateHeight from 'react-animate-height';
import MilestoneDetailRow from './MilestoneDetailRow_dc';

const Milestone = props => {
  let iconString = "";
  let additionalTimeInfo = '';
  switch(props.info.type){
    case 'food':
      iconString = "fa fa-cutlery fa-2x";
      break;
    case 'lodging':
      iconString = "fa fa-bed fa-2x";
      additionalTimeInfo = 
        (<div>
          {props.info.duration} in {props.info.locationComponents.locality}
         </div>);
      break;
    case 'flight':
      iconString = "fa fa-plane fa-2x";
      break;
    default:
      iconString = "fa fa-map-marker fa-2x";
  }

  const showContent = props.showDetail
    ? <MilestoneDetailRow
        info={props.info}
        additionalTimeInfo={additionalTimeInfo}
      >
        {props.children}
      </MilestoneDetailRow>
    : <ul className="list-inline">
        <li className="activity-time">
          {props.info.time}
          {additionalTimeInfo}
        </li>
        <li className="activity-name">
          {props.info.description}
          {props.children}
        </li>
      </ul>;

  return (
    <AnimateHeight
      duration={ 500 }
      height={ props.height }
      className={`${props.info.type}`}
      >
       <div className="timeline-row">
        <div className="timeline-block">
          <div className={`timeline-activity-marker ${props.info.type}`}>
            <i className={iconString} aria-hidden="true" />
          </div>
          <div className="timeline-content">
            {showContent}
          </div>
        </div>
    </div>
  </AnimateHeight>

  );
};

export default Milestone;