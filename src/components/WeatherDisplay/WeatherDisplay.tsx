import React from "react";
import { Spin, Alert, Empty } from "antd";
import { WeatherData } from "../../services/weatherService";
import styles from "./WeatherDisplay.module.scss";
import WeatherDetails from "../WeatherDetails/WeatherDetails";

interface WeatherDisplayProps {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  data,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className={styles.spinner}>
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        className={styles.alert}
      />
    );
  }

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return <WeatherDetails data={data} />;
};

export default WeatherDisplay;
