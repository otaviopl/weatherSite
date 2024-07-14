// src/components/Weather.js
import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'YOUR_API_KEY'; 

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('Cidade não encontrada');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error.message);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h2>Consulta de Clima</h2>
      <input
        type="text"
        placeholder="Digite o nome da cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Consultar</button>
      
      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Condição: {weatherData.weather[0].description}</p>
        </div>
      )}

      {weatherData === null && <p>Cidade não encontrada</p>}
    </div>
  );
};

export default Weather;
