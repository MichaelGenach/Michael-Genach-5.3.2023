import React from 'react'
import { useState } from 'react'
import './Home.css'
import axios from 'axios'
import HomeC from './HomeC'
import { useEffect } from 'react'



export default function Home(props) {



    const [cityKey, setCityKey] = useState('215854')
    const [cityFore, setCityFore] = useState([])
    const [cloudFore, setCloudFore] = useState([])


    const [color, setColor] = useState('red')

    const [suggest, setSuggest] = useState([])




    useEffect(() => {
    try {
        axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=kAlHsYIZLTTpj53ldyPvKgKy45JN3ccy&q=${props.cityName}`)
            .then((response) => {

                // props.setCityName(response.data[0].EnglishName)
                // props.setCityId(response.data[0])
                setCityKey(response.data[0].Key)
                props.setCityId(response.data[0].AdministrativeArea.ID)

                // console.log(response.data[0]);


            })
    }
    catch (err) { console.log(err) }
}, [props.cityName])


    useEffect(() => {
        try {
            axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=kAlHsYIZLTTpj53ldyPvKgKy45JN3ccy`)
                .then((response) => {
                    setCloudFore(response.data[0].WeatherText)
                    props.setCityCurrent(response.data[0].Temperature.Metric.Value)
                    // console.log(response.data)
                })
        }
        catch (err) { console.log(err) }


        try {

            axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=kAlHsYIZLTTpj53ldyPvKgKy45JN3ccy`)
                .then((response) => {

                    // DailyForecastsArr = response.data.DailyForecasts

                    setCityFore(response.data.DailyForecasts)

                    // console.log(response.data)
                })
        }
        catch (err) { console.log(err); }
    }, [cityKey])









    useEffect(() => {
        try {
            axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=kAlHsYIZLTTpj53ldyPvKgKy45JN3ccy&q=${props.cityName}`)
                .then((response) => {


                    setSuggest(response.data.map((val) => {
                        return val.LocalizedName

                    }))
                })
        } catch (err) { console.log(err); }

    }, [props.cityName])






    useEffect(() => {
        // console.log(props.cityName, props.favoritesArr);
        for (let j = 0; j < props.favoritesArr.length; j++) {
            if (props.favoritesArr[j].name === props.cityName) { setColor('lightgreen'); return }
        }
        setColor('red')
    }, [props.favoritesArr, props.cityName])






    return (
        <div>



            <br />
            <br />
            <br />
            <br />

            {/* kAlHsYIZLTTpj53ldyPvKgKy45JN3ccy */}
            <div className='home'>

                <br />
                <br />
                <br />


                <input type="text" placeholder='Enter a favorite city' onChange={(e) => { props.setCityName(e.target.value) }} />
                <br />
                {/* <DropdownInput options = {suggest} placeholder='Enter a favorite city' onChange={(e) => { props.setCityName(e.target.value) }}></DropdownInput> */}
                <br />
                {suggest.slice(0, 5).map((val) => {
                    return <button style={{ width: 'auto', height: '40px' }} onClick={() => { props.setCityName(val) }}>{val}</button>
                })}
                <br />
                <br />
                <div className='today' >

                    {props.cityName}
                    <br />
                    {props.cityId}
                    <br />
                    {props.cityCurrent}°C
                </div>



                <button style={{ backgroundColor: color }} className='b'
                    onClick={() => { props.addToFavorites(props.cityName, props.cityId, props.cityCurrent) }}>

                    Add to / Remove From <br />
                    Favorites

                </button>


                <h3 className='cloud'>{cloudFore}</h3>

                <div className='fore'>
                    {cityFore.map((val) => {
                        return <HomeC val={val} />


                    })}
                </div>



            </div>


        </div>
    )
}
