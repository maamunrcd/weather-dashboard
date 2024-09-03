import React, { useEffect } from "react";
import { Layout, Typography, List } from "antd";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import { useWeather } from "./hooks/useWeather";
import { useRecentSearches } from "./hooks/useRecentSearches";
import styles from "./App.module.scss";

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
      handleSearch(recentSearches[0].city);
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
        <div className={styles.recentSearches}>
          <Title level={3}>Recent Searches</Title>
          <List
            bordered
            dataSource={recentSearches}
            renderItem={(item) => (
              <List.Item onClick={() => handleSearch(item.city)}>
                {item.city}
              </List.Item>
            )}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>© 2024 Weather Dashboard</Footer>
    </Layout>
  );
};

export default App;
