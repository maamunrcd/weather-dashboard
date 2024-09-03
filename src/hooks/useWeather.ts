import { useState, useCallback, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherService";
import { WeatherData } from "../types/weatherdata";

const getRecentSearches = () => {
  const searches = localStorage.getItem("recentSearches");
  return searches ? JSON.parse(searches) : [];
};

const saveRecentSearches = (
  searches: { city: string; weather: WeatherData }[]
) => {
  localStorage.setItem("recentSearches", JSON.stringify(searches));
};

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<
    { city: string; weather: WeatherData }[]
  >(getRecentSearches());

  const handleSearch = useCallback(
    async (city: string) => {
      setLoading(true);
      setError(null);
      setWeather(null);
      try {
        const data = await getWeatherByCity(city);
        setWeather(data);
        if (city !== "") {
          const newSearches = [
            { city, weather: data },
            ...recentSearches.filter((search) => search.city !== city),
          ];
          setRecentSearches(newSearches);
          saveRecentSearches(newSearches);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [recentSearches]
  );

  useEffect(() => {
    if (recentSearches.length > 0) {
      handleSearch(recentSearches[0].city);
    }
  }, [handleSearch, recentSearches]);

  return {
    weather,
    loading,
    error,
    recentSearches,
    handleSearch,
  };
};
