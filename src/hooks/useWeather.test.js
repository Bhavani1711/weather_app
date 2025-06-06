import { renderHook } from '@testing-library/react';
import useWeather from './useWeather';

// Mock fetch globally
global.fetch = jest.fn();

afterEach(() => {
  fetch.mockClear();
});

test('fetches and returns weather data', async () => {
  const mockResponse = {
    name: 'Paris',
    sys: { country: 'FR' },
    weather: [{ description: 'clear sky' }],
    main: { temp: 22, humidity: 50 },
    wind: { speed: 3 },
  };

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  });

  const { result, waitForNextUpdate } = renderHook(() => useWeather('Paris'));

  await waitForNextUpdate(); // wait for useEffect to complete

  expect(result.current.weather.name).toBe('Paris');
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBe('');
});
