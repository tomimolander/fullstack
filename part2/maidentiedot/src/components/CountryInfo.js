import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
    return (
        <div>
        find countries <input
          value={value}
          onChange={onChange}
          />
        </div>
    )
}

const SpecificCountry = (country) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {
        Object.entries(country.languages).map(([k,v]) => <li key={k}>{v}</li>)
        }
      </ul>
      <img src={country.flags.png} alt="Country Flag" width="200" height="150"></img>
      <WeatherReport country={country}/>
    </div>
  )
}

const WeatherReport = ({country}) => {

  const [ weather, setWeather ] = useState([])
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => { 
        setWeather(response.data) 
      })
  }, [])
  if (weather.length === 0){
    return <p>loading</p>
  } else{
    return <div>
    <h3>Weather in {country.capital}</h3>
      <b>temperature: </b>
      <span>{weather.current.temperature} Celcius<br></br></span>
      <img src={weather.current.weather_icons} alt="Weather image" width="75" height="75"></img>
      <b><br></br>wind: </b>
      <span>{weather.current.wind_speed} km/h direction {weather.current.wind_dir}</span>
    </div>
  }
}

const Countries = ({countries, onButtonClick}) => {
  if (countries.length > 10 ) return <p>Too many matches, specify another filter</p>
  else if (countries.length === 1){
    return SpecificCountry(countries[0])
  }
  else{
    return (
      countries.map(function(country){
          return (
          <div key={country.name.common}>
            <span>{country.name.common}</span>
            <button onClick={() => onButtonClick(country.name.common)}>show</button>
          </div> )
        })
    )
  }
}

export {Filter, Countries};