import React, { useEffect } from "react";
import { Layout, Typography } from "antd";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import { useWeather } from "./hooks/useWeather";
import { useRecentSearches } from "./hooks/useRecentSearches";
import styles from "./App.module.scss";
import RecentSearches from "./components/RecentSearches/RecentSearches";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const { weather, loading, error, fetchWeather } = useWeather();
  const { recentSearches, addSearch } = useRecentSearches();

  const handleSearch = async (city: string) => {
    const fetchedWeather = await fetchWeather(city);
    if (city && fetchedWeather) {
      addSearch(city);
    }
  };

  useEffect(() => {
    if (recentSearches.length > 0) {
      handleSearch(recentSearches[0]);
    }
  }, []);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Title level={3} className={styles.title}>
          Weather Dashboard
        </Title>
      </Header>
      <Content className={styles.content}>
        <SearchBar onSearch={handleSearch} />
        <WeatherDisplay data={weather} loading={loading} error={error} />
        <RecentSearches
          recentSearches={recentSearches}
          handleSearch={handleSearch}
        />
      </Content>
      <Footer style={{ textAlign: "center" }}>© 2024 Weather Dashboard</Footer>
    </Layout>
  );
};

export default App;
