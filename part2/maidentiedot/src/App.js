import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Filter, Countries} from './components/CountryInfo'



const App = () => {
  const [ newSearch, setNewSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => { 
        setCountries(response.data) 
      })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const countryFilter = () => {
    return countries.filter( country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
  }

  let filteredCountries = countryFilter()

  return (
    <div>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <Countries 
      countries={filteredCountries}
      onButtonClick={setNewSearch}
      />
    </div>
  )

}

export default App