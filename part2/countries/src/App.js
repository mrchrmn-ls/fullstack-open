import React, { useEffect, useState } from "react";
import axios from "axios";


const SearchResult = ({ countries }) => {
  if (countries.length > 10) return (
    <p>Too many matching countries. Please be more specific.</p>
  );

  if (countries.length > 1) return (
    <>
      {
        countries.map(country => <p key={country.population}>{country.name.common}</p>)
      }
    </>
  );

  if (countries.length === 1) return (
    <Country country={countries[0]} />
  )

  if (countries.length === 0) return (
    <p>No matching countries found.</p>
  )
};


const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {
          Object.keys(country.languages).map(key => <li key={country.name + key}>{country.languages[key]}</li>)
        }
      </ul>
      <h1>{country.flag}</h1>
    </>
  )
}


function App() {
  const [ countries, setCountries ] = useState([]);
  const [ searchPhrase, setSearchText ] = useState("");

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(res => {
      setCountries(res.data);
    })
  }, [])

  const searchHandler = (event) => {
    setSearchText(event.target.value);
  };

  const searchResult = (countries, searchPhrase) => {
    return countries.slice().filter(country => country.name.common.toLowerCase().includes(searchPhrase.trim().toLowerCase()));
  }

  
  if (countries.length === 0) {
    return <p>Loading country database...</p>
  }

  if (searchPhrase.length === 0) {
    return (
      <div>
        Find country: <input onChange={searchHandler} value={searchPhrase} />
      </div>
    )
  }

  return (
    <div>
      Find country: <input onChange={searchHandler} value={searchPhrase} />
      <SearchResult countries={searchResult(countries, searchPhrase)} />
    </div>
  );
}

export default App;
