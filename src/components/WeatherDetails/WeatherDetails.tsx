import React from "react";
import { Card } from "antd";
import { WeatherData } from "../../services/weatherService";
import styles from "./WeatherDetails.module.scss";
type WeatherCondition = "Sunny" | "Rainy" | "Cloudy";

interface WeatherIconProps {
  condition: WeatherCondition;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition }) => {
  let icon: string;

  switch (condition) {
    case "Sunny":
      icon = "sunny";
      break;
    case "Rainy":
      icon = "rainy";
      break;
    case "Cloudy":
      icon = "cloudy";
      break;
    default:
      icon = "default";
      break;
  }

  return <span className="material-symbols-outlined">{icon}</span>;
};
interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
  return (
    <Card title="Current Weather" className={styles.card}>
      <h3>
        <strong>CITY:</strong> {data.city?.toUpperCase()}
      </h3>
      <div className={styles.details}>
        <Card className={styles.item} title="Temperature:">
          {data.temperature}°C
        </Card>
        <Card className={styles.item} title="Conditions:">
          <div>{data.conditions}</div>
          <WeatherIcon condition={data.conditions as WeatherCondition} />
        </Card>
        <Card className={styles.item} title="Humidity:">
          {data.humidity}%
        </Card>
        <Card className={styles.item} title="Wind Speed:">
          {data.windSpeed}m/s
        </Card>
      </div>
    </Card>
  );
};

export default WeatherDetails;
