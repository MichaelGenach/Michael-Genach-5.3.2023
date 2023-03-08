import React from 'react'

export default function HomeC(props) {

 

 let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  return (
    <div>

<h3 className='num'>{Math.round((props.val.Temperature.Maximum.Value -32)/1.8)} °C</h3> 
<h4 style={{margin:'10px'}}>{days[new Date(props.val.Date).getDay()]}</h4>
{console.log(props.val.Date)}
    </div>
  )
}
