import { useState, useCallback } from "react";
import { getWeatherByCity, WeatherData } from "../services/weatherService";
export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(
    async (city: string): Promise<WeatherData | null> => {
      setLoading(true);
      setError(null);
      setWeather(null);
      try {
        const data = await getWeatherByCity(city);
        setWeather(data);
        return data;
      } catch (err) {
        setError((err as Error).message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { weather, loading, error, fetchWeather };
};
