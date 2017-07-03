import React from 'react'


const K_WIDTH = 30;
const K_HEIGHT = 30;



const simpleMarkerStyle = (props) => {
  let backgroundColor = '#75ce66';
  switch(props.type){
    case 'food':
      backgroundColor = '#4DB810'; 
      break;
    case 'lodging':
      backgroundColor = '#0BBCB2';
      break;
    case 'flight':
      backgroundColor ='#d73532';
      break;
    default:
      backgroundColor = '#d68c2f';
  
  }




  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  return ({
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '3px solid white',
    borderRadius: K_HEIGHT,

    boxShadow: '0 .5px 0 .5px gray', 
    backgroundColor: `${backgroundColor}`,
    textAlign: 'center',
    // color: '#3f51b5',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  })
};

const SimpleMarkerIcon = (props) => {
  let iconString = '';
  switch(props.type){
    case 'food':
      iconString = 'fa fa-cutlery fa-1x';
      break;
    case 'lodging':
      iconString = 'fa fa-bed fa-1x';
      break;
    case 'flight':
      iconString = 'fa fa-plane fa-1x';
      break;
    default:
      iconString = 'fa fa-map-marker fa-1x';
 
  }


  return (
    <div className={`timeline-activity-marker ${props.type}`}>
      <i className={iconString} aria-hidden="true"></i>
    </div>
  );

}

export {simpleMarkerStyle, SimpleMarkerIcon};