declare module "weather-icons-react" {
  import * as React from "react";

  interface WeatherIconProps {
    icon: string;
    size?: "small" | "medium" | "large" | number;
    color?: string;
  }

  export default class WeatherIcon extends React.Component<WeatherIconProps> {}
}
