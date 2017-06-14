import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <span className="icn-logo"><i className="material-icons">code</i></span>
          <ul className="main-nav">
            <li><a href="#/main_page">Home</a></li>
            <li><a href="#/day_view">Day View</a></li>
            <li><a href="/teachers">Teachers</a></li>
            <li><a href="/courses">Courses</a></li>
          </ul>       
        </header>
        { this.props.children }
      </div>
    );
  }
}

export default App;