import React from "react";

const Milestone = props => {
  let iconString = "";
  switch(props.info.type){
    case 'food':
      iconString = "fa fa-cutlery fa-2x";
      break;
      case 'lodging':
        iconString = "fa fa-map-marker fa-2x";
        break;
      case 'flight':
        iconString = "fa fa-plane fa-2x";
        break;
      default:
        iconString = "fa fa-map-marker fa-2x";
  }

  return (
    <div className={`pt-2 ${props.info.type}`}>
      <div className="timeline-block">
        <div className={`timeline-activity-marker ${props.info.type}`}>
          <i className={iconString} aria-hidden="true" />
        </div>
        <div className="timeline-content">
          <ul className="list-inline">
            <li className="activity-time">
              {props.info.time}
              {props.info.arrivalTime}
            </li>
            <li className="activity-name">
              {props.info.description}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Milestone;