import React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      activeClass: ""
    };
  }

  componentDidMount() {
    this.setState({
      mounted: true,
      activeClass: "model-active"
    });
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    let child = this.state.mounted
      ? <div className={`modal ${this.state.activeClass}`} key="addActivity">
          <button
            className="close-button float-right"
            onClick={this.props.onClose}
          >
            X
          </button>
          <div className="modal-container">
            <h2>{this.props.header}</h2><br />

            <div className="row">
              <div className="col-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      : "";

    return (
      <div className="backdrop">
        {child}
      </div>
    );
  }
}

export default Modal;

//<div className="footer">
//   <button onClick={this.props.onClose}>
//     Close
// </button>
// </div>

// <CSSTransitionGroup
//   transitionName="addActivity"
//   transitionEnterTimeout={100}
//   transitionLeaveTimeout={300} >
//   {child}
//  </CSSTransitionGroup>