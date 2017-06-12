import React from 'react'
import { NavLink } from 'react-router-dom'

import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';

import MainPage from './MainPage'
import DayView from './DayView'
import SingleDay from './SingleDay'
import App from './App'


const routes = (
	<div>


	  <Route path="/home" component={MainPage} />
	  <Route path="/day_view" component={DayView} />
	  <Route path="/single_day" component={SingleDay} />

	</div>
)

export default routes