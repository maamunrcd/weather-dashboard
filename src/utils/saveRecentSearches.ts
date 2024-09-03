import { WeatherData } from "../../services/weatherService";

const saveRecentSearches = (
  searches: { city: string; weather: WeatherData }[]
) => {
  localStorage.setItem("recentSearches", JSON.stringify(searches));
};

export default saveRecentSearches;
