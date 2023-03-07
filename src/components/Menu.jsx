import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

export default function Menu(props) {
  return (
    <div>
      <h1>What's The Weather?
      </h1>
 <div className='menu'>     
<Link to={'/'}><button className='buttons'>Home</button></Link>
<Link to={'/favorites'}><button className='buttons'>Favorites</button></Link>
</div>  


    </div>
  )
}
