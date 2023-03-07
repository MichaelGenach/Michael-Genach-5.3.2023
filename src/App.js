import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Favorites from './components/Favorites';
import Menu from './components/Menu';
import { useState } from 'react';


// !הכל רספונסיבי... flexBox את  app.css הצבתי ב


function App() {

  const [cityName, setCityName] = useState('Tel Aviv')
  const [cityId, setCityId] = useState('')
  const [cityCurrent, setCityCurrent] = useState(0)

  const [favoritesArr, setFavoritesArr] = useState([])
  const [color, setColor] = useState('red')

  const [currentFav, setCurrentFav] = useState(0)



  const addToFavorites = (name, id, weather) => {

    for (let i = 0; i < favoritesArr.length; i++) {
      if (favoritesArr[i].name === name) {
        let arr = [...favoritesArr]
        arr.splice(i, 1)
        setFavoritesArr(arr)

        return;
      }
    }

    let favoritesObj = new Favorite(name, id, weather)

    setFavoritesArr([...favoritesArr, favoritesObj])
  }

  // console.log(cityName);
  // console.log(favoritesArr);



  return (
    <div className="App">




      <BrowserRouter>

        <Menu />

        <Routes>

          <Route path='/' element={<Home setCityId={setCityId} cityCurrent={cityCurrent} setCityCurrent={setCityCurrent}
            cityId={cityId} cityName={cityName} color={color} setColor={setColor} favoritesArr={favoritesArr} setCityName={setCityName} addToFavorites={addToFavorites} currentFav={currentFav} />} />

          <Route path='/favorites' element={<Favorites setCityCurrent={setCityCurrent} setCityId={setCityId}
            setCityName={setCityName} favoritesArr={favoritesArr} setCurrentFav={setCurrentFav} setColor={setColor}
          />} />


        </Routes>
      </BrowserRouter>




    </div>
  );
}

export default App;


class Favorite {

  constructor(name, id, weather) {
    this.name = name
    this.id = id
    this.weather = weather
  }
}