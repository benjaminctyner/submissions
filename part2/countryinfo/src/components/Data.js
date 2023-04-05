import axios from 'axios';
import { useState, useEffect } from 'react';

const Data = ({ country, weather, onLoad }) => {
  const [temp, setTemp] = useState(0);
  const [cond, setCond] = useState('');
  const [icon, setIcon] = useState('');
  const [wind, setWind] = useState('');
  const [cloud, setCloud] = useState('');

  const apikey = process.env.REACT_APP_API_KEY;
  const a = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${country.capital}`;

  axios.get(a).then((response) => {
    console.log(response.data);
    setTemp(response.data.current.temp_f);
    setCond(response.data.current.condition.text);
    setIcon(response.data.current.condition.icon);
    setWind(response.data.current.wind_mph);
    setCloud(response.data.current.cloud);
  });

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} square kilometers</p>
      </div>
      <div>
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      </div>
      <div>
        <h2>Weather in: {country.capital} </h2>
        <img src={icon} alt='icon of weather conditions' />
        <ul>
          <li>Temp: {temp} F</li>
          <li>Conditions: {cond}</li>
          <li>Wind: {wind} mph</li>
          <li>Cloud Cover: {cloud}%</li>
        </ul>
      </div>
    </div>
  );
};

export default Data;
