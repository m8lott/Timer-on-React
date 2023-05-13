import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

//put the root element in a variable
const root = ReactDOM.createRoot(document.getElementById('root'));

//create the main component
function App () {
  //I create states using the useState hook
  let [value,setValue] = useState({minutes:'0',seconds:'00'});
  let [flag,setFlag] = useState(false);
  let [interval,setInt] = useState('');

 //create a handler for entering minutes
  let changeInpMin = (e) => {
    if (Number(e.target.value) && e.target.value.length < 3) {
      setValue({...value,minutes: value = e.target.value});
    } 

    if (e.target.value.length == 0) {
      setValue({...value,minutes: value = '0'});
    }
  }

  //create a handler for entering seconds
  let changeInpSec = (e) => {
    if (Number(e.target.value) && e.target.value.length < 3 && e.target.value.length > 1) {
      setValue({...value,seconds: value = e.target.value});
    } else if (Number(e.target.value) && e.target.value.length < 3 && e.target.value.length == 1 ) {
      setValue({...value,seconds: value = `0${e.target.value}`});
    }
 
    if (e.target.value.length == 0) {
      setValue({...value,seconds: value = '00'});
    }
  }

  //use the useEffect hook to write the logic for the ''Start'' button
  useEffect (() => {
if (flag) {
  var timer = setInterval (() => {

    value.seconds <= 9 ? setValue({...value,seconds: `0${value.seconds--}`}) :
    setValue({...value,seconds:value.seconds--});
   
    if (value.minutes != 0 && value.seconds == -1) {
      setValue({minutes:  --value.minutes,seconds: value.seconds = 59});
    }

    if (value.seconds < 0) {
      clearInterval(timer);
    }

    if (value.seconds == '00' && value.minutes == -1) {
      return setFlag(false);
     }
  },1000)
}
    
return setInt(timer);
  },[flag])

  //create a handler for the "Start" button
let start = () => {
setFlag(true)
}

 //create a handler for the "Reset" button
  let reset = () => {
    setValue ({seconds:'00', minutes:'0'});
    setFlag(false);
    clearInterval(interval);
  }

   //create a handler for the "Stop" button
  let stop = () => {
    clearInterval(interval);
    setFlag(false);
  }

//render components and elements. To render child components I use state hoisting
 return (
  <div className='main'>
    <h1>{`${value.minutes} : ${value.seconds}`}</h1>
 <div className='butPan'>
<Buttons reset = {reset} stop = {stop}  start = {start}/>
  </div>
  <div className='inpPan'>
<Inputs style = {{display: flag ? 'none' : 'flex'}} inpMin = {changeInpMin} inpSec = {changeInpSec}/>
  </div>
  </div>
  
 
 )
}
//render main component
root.render(<App />)


//create component for buttons
function Buttons (props) {
  let buttons = [{
    id:'start',
    text:'Start'
  },
  {
    id:'stop',
    text:'Stop'
  },{
    id:'reset',
    text:'Reset'
  }]
  return buttons.map((item) => {
   return <button onClick={item.id == 'reset' ? props.reset : item.id == 'start' ? props.start : props.stop} value = {item.id}>{item.text}</button>
  })
}

//create component for inputs
function Inputs (props) {
  let inputs = [{
    id:'mins',
    placeholder: 'Minutes'
  },{
    id:'secs',
    placeholder: 'Seconds'
  }]

  return inputs.map((item) => {
    return <input style = {props.style} onChange={item.id == 'mins' ? props.inpMin : props.inpSec} type = 'text' placeholder={item.placeholder}></input>
  })
}

