import api from "./api";
export interface WeatherData {
  city: string;
  temperature: number;
  conditions: string;
  humidity: number;
  windSpeed: number;
}

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await api.get(`/weather?city=${city}`);

    if (!response.data || response.data.length === 0) {
      throw new Error("No weather data found for the specified city.");
    }

    const weatherData: WeatherData = city !== "" ? response.data[0] : "";
    return weatherData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching weather data.");
    }
  }
};
