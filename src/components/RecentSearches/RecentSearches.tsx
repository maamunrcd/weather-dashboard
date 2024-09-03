import React from "react";
import { List, Typography } from "antd";

const { Title } = Typography;

interface RecentSearchesProps {
  recentSearches: { city: string; weather: any }[];
  onSearch: (city: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
  recentSearches,
  onSearch,
}) => (
  <div>
    <Title level={3}>Recent Searches</Title>
    <List
      bordered
      dataSource={recentSearches}
      renderItem={(item) => (
        <List.Item onClick={() => onSearch(item.city)}>{item.city}</List.Item>
      )}
    />
  </div>
);

export default RecentSearches;
