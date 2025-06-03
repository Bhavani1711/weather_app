import React, { useState } from 'react';
import useWeather from './hooks/useWeather';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const { weather, loading, error } = useWeather(query);

  const handleSearch = () => {
    if (city.trim()) {
      setQuery(city.trim());
    }
  };

  return React.createElement(
    'div',
    { style: styles.container },
    React.createElement('h1', { style: styles.title }, 'Weather App'),
    React.createElement(
      'div',
      { style: styles.inputGroup },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Enter city',
        value: city,
        onChange: (e) => setCity(e.target.value),
        style: styles.input,
      }),
      React.createElement(
        'button',
        { onClick: handleSearch, style: styles.button },
        'Search'
      )
    ),
    loading && React.createElement('p', null, 'Loading weather...'),
    error &&
      React.createElement(
        'p',
        { style: { color: 'red' } },
        error
      ),
    weather &&
      React.createElement(
        'div',
        { style: styles.card },
        React.createElement(
          'h2',
          null,
          `${weather.name}, ${weather.sys.country}`
        ),
        React.createElement('p', null, weather.weather[0].description),
        React.createElement('h3', null, `${weather.main.temp}°C`),
        React.createElement('p', null, `Humidity: ${weather.main.humidity}%`),
        React.createElement('p', null, `Wind: ${weather.wind.speed} m/s`)
      )
  );
}

const styles = {
  container: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    padding: '2rem',
    background: '#eef6fb',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    width: '200px',
    marginRight: '0.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  card: {
    background: '#fff',
    padding: '1rem',
    marginTop: '1rem',
    borderRadius: '8px',
    
    display: 'inline-block',
  },
};

export default WeatherApp;

