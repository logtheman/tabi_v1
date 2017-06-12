import React from 'react'


const K_WIDTH = 30;
const K_HEIGHT = 30;



const simpleMarkerStyle = (props) => {
  let backgroundColor = '#75ce66';
  if(props.type === 'food'){
    backgroundColor = '#75ce66';    
  }else if(props.type === 'activity'){
    backgroundColor = '#FFAD46';
  }else if(props.type === 'lodging'){
    backgroundColor = '#9FE1E7'
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
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  })
};

const SimpleMarkerIcon = (props) => {
  let iconString = '';
  if(props.type === 'food'){
    iconString = 'fa fa-cutlery fa-1x';
  }else if(props.type === 'activity'){
    iconString = 'fa fa-map-marker fa-1x';
  }else if(props.type === 'lodging'){
    iconString = 'fa fa-bed fa-1x';
  }

  return (
    <div className={`timeline-activity-marker ${props.type}`}>
      <i className={iconString} aria-hidden="true"></i>
    </div>
  );

}

export {simpleMarkerStyle, SimpleMarkerIcon};