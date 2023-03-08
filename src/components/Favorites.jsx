import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Favorites.css'

export default function Favorites(props) {

    const nev = useNavigate();

    const set = (index) => {

        nev('/');
        props.setCityName(props.favoritesArr[index].name);


    }


    return (
        <div className='favorites'>

            {props.favoritesArr.map((val, index) => {

                return <button onClick={() => { set(index) }}>
                    
                    {val.name}
                    <br />
                    {val.id}
                    <br />
                    {val.weather} °C
                    
                    </button>

            })}


        </div>
    )
}
