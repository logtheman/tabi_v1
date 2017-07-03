import React from "react";
import AddTransportationContainer from "../../containers/AddTransportationContainer_sc";



const Transportation = props => {
  let iconString = "";
  switch (props.info.transportationType) {
    case "bike":
      iconString = "fa fa-bicycle fa-2x";
      break;
    case "walk":
      iconString = "fa fa-blind fa-2x";
      break;
    case "train":
      iconString = "fa fa-train fa-2x";
      break;
    case "boat":
      iconString = "fa fa-ship fa-2x";
      break;
    case "bus":
      iconString = "fa fa-bus fa-2x";
      break;
    default:
      iconString = "fa fa-car fa-2x";
  }

  return (
    <div className="">
      <div className="timeline-block">
        <div className="transportation-row">
          <div className="transportion-content">
            <ul className="list-inline">
              <li className="list-inline-item">
                <i className={iconString} aria-hidden="true" />
              </li>
              <li className="list-inline-item transportion-detail left-padding">
                <b>{props.info.transportationType}</b>{":"}
              </li>
              <li className="list-inline-item transportion-detail">
                {props.info.startLocation.name}
              </li>
              {"-> "}
              <li className="list-inline-item transportion-detail">
                {props.info.endLocation.name}
              </li>
              <li className="list-inline-item transportion-detail">{" / "}{props.info.duration}</li>
              <li className="list-inline-item transportion-detail">{" / "}{props.info.distance}</li>
              <li className="list-inline-item transportion-detail">{" / "}{props.info.estimatedCost}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transportation;