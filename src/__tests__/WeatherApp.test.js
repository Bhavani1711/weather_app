import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherApp from '../App';
import * as hook from '../hooks/useWeather'; // import the hook to mock

// Mock the useWeather hook
jest.mock('../hooks/useWeather');

describe('WeatherApp Component', () => {
  test('renders title and input field', () => {
    hook.default.mockReturnValue({ weather: null, loading: false, error: '' });

    render(<WeatherApp />);
    expect(screen.getByText(/weather app/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter city/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  test('calls API and displays weather info after search', () => {
    hook.default.mockReturnValue({
      weather: {
        name: 'London',
        sys: { country: 'GB' },
        weather: [{ description: 'cloudy' }],
        main: { temp: 15, humidity: 70 },
        wind: { speed: 5 },
      },
      loading: false,
      error: '',
    });

    render(<WeatherApp />);
    fireEvent.change(screen.getByPlaceholderText(/enter city/i), {
      target: { value: 'London' },
    });
    fireEvent.click(screen.getByText(/search/i));

    expect(screen.getByText(/London, GB/)).toBeInTheDocument();
    expect(screen.getByText(/cloudy/i)).toBeInTheDocument();
    expect(screen.getByText(/15°C/)).toBeInTheDocument();
  });
});
