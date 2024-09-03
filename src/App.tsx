// src/App.tsx

import React, { useState } from "react";
import { Layout, Typography, List, Card, Spin } from "antd";
import SearchBar from "./components/SearchBar/SearchBar";
import { getWeatherByCity, WeatherData } from "./services/weatherService";
import styles from "./App.module.scss";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";

const getRecentSearches = () => {
  const searches = localStorage.getItem("recentSearches");
  return searches ? JSON.parse(searches) : [];
};

const saveRecentSearches = (
  searches: { city: string; weather: WeatherData }[]
) => {
  localStorage.setItem("recentSearches", JSON.stringify(searches));
};

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<
    { city: string; weather: WeatherData }[]
  >(getRecentSearches());

  const handleSearch = async (city: string) => {
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
  };
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Title level={3} className={styles.title}>
          Weather Dashboard
        </Title>
      </Header>
      <Content className={styles.content}>
        <SearchBar onSearch={handleSearch} />
        {loading && <Spin size="large" />}
        {error && <p>{error}</p>}
        {weather && !loading && (
          <WeatherDisplay
            data={weather ? weather : recentSearches[0]?.weather}
            loading={loading}
            error={error}
          />
        )}
        {!weather && (
          <div className={styles.recentSearches}>
            <Title level={3}>Recent Searches</Title>
            <List
              bordered
              dataSource={recentSearches}
              renderItem={(item) => (
                <List.Item>
                  <WeatherDetails data={item.weather} />
                </List.Item>
              )}
            />
          </div>
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>© 2024 Weather Dashboard</Footer>
    </Layout>
  );
};

export default App;
