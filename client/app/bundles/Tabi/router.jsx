import React from 'react'
import { NavLink } from 'react-router-dom'
import TransitionGroup from "react-transition-group/TransitionGroup";


import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';

import MainPage from './containers/MainPage_sc'
import DayView from './components/single_day_components/DayView'
import SingleDay from './containers/SingleDay_sc'
import App from './containers/App_sc'

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

const routes = (
	<div>
	  <Route path="/home" component={MainPage} />
	  <Route path="/day_view" component={DayView} />
	  <Route path="/single_day" component={SingleDay} />
	</div>
)

export default routes;
