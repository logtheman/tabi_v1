import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'


class Modal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mounted: false,
      activeClass: '',
    }
  }

  componentDidMount() {
    this.setState({ 
      mounted: true,
      activeClass: 'model-active'
    });
  }

  

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    let child = this.state.mounted ?
      (<div className={`modal ${this.state.activeClass}`} key="addActivity" >
          {this.props.children}
         <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>) :
      '';


    return (
      <div className="backdrop" >
        <CSSTransitionGroup
          transitionName="addActivity"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={300} >
          {child}
         </CSSTransitionGroup>
      </div>
        
      
    );
  }
}

export default Modal;

