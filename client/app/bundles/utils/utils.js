
import React from 'react';

export function findByID(milestone, ID){
  return milestone.ID === ID;
}

export function getDate(){
	const today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1; //January is 0!

	const yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 

	const date = `${yyyy}-${mm}-${dd}`;
	console.log(date);

	return date;
}


export function getDateString(dateTime){
	const d = new Date(dateTime);
	return d.toLocaleString();
}

export function _fetch(url, options) {
  return fetch(url, options)
    .then(response=>{
      return response.json();
    })
    .catch(err=>{
      console.log('There was an error processing your request');
      console.log(err);
    });
}

export function post(url, payload, options, type) {
	const token = type === 'internal' ? document.getElementsByName("csrf-token")[0].content : null;

  const defaultOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'X-CSRF-Token':  token,
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}

export function get(url, options={}) {

  const defaultOptions = {
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    }
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}
