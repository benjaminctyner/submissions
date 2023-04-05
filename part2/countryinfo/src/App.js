import { useState, useEffect } from 'react';
import axios from 'axios';
import Query from './components/Query';
import Results from './components/Results';
import countryService from './services/countries';
import Data from './components/Data';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState(null);
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);
  if (!countries) {
    return null;
  }

  const fetchWeather = (weatherUrl) => {
    const request = axios.get(weatherUrl);
    return request.then((response) => response.data);
  };

  const Weather = ({ country }) => {
    const api_key = '901ea2e12d1cb70a4118d0b411e4d8eb';
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`;
    fetchWeather(weatherUrl).then((initialCountries) => {
      setWeather(initialCountries);
    });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Countries!</h1>
      <Query name={search} onChangeName={handleNameChange} />
      <ul>
        {filteredCountries.length > 10 && (
          <p>Too many matches, please be more specific!</p>
        )}
        {filteredCountries.length > 1 &&
          filteredCountries.length < 11 &&
          filteredCountries.map((country) => (
            <Results
              key={country.name.common}
              country={country}
              onClick={() => setSearch(country.name.common)}
            />
          ))}
        {filteredCountries.length < 1 && (
          <p>No countries matching your search criteria!</p>
        )}
        {filteredCountries.length == 1 && (
          <Data
            onLoad={Weather}
            country={filteredCountries[0]}
            weather={weather}
          />
        )}
      </ul>
    </div>
  );
}

export default App;
